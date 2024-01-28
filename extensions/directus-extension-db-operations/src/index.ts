import { defineHook } from '@directus/extensions-sdk';
import type { CollectionsOverview, FieldOverview, SchemaOverview } from "@directus/types";
import type { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { readFileSync } from 'fs';
import pluralize from 'pluralize';
type Collection = CollectionsOverview[''];
function upperCamelCase(value: string) {
	return value.split('_')
		.map(part => part[0]?.toUpperCase() + part.substring(1).toLowerCase())
		.join('');
}

function className(collection: Collection): string {
	const plural = collection.collection;
	const singular = pluralize.singular(plural);
	return upperCamelCase(singular);
}

function fieldToRelationType(field: FieldOverview, collection: Collection, schema: SchemaOverview): string | null {
	const relation = schema.relations.find(relation => relation.collection === collection.collection && relation.field === field.field);
	if (!relation) {
		return null;
	}
	if (relation.related_collection) {
		// This relation references a single target collection
		const targetClassName = className(schema.collections[relation.related_collection]);
		const keyType = relation?.schema?.foreign_key_column ?
			// There is a foreign key, so we can use readable names
			`${targetClassName}["${relation.schema.foreign_key_column}"]` :
			// No foreign key, so let's just use the field type
			fieldTypeToJsType(field, collection);

		return `${targetClassName} | ${keyType}`;
	}

	// This relation might reference multiple target collections
	if (relation.meta?.one_allowed_collections?.length) {
		const relatedCollections = relation.meta.one_allowed_collections;
		const types = relatedCollections.map(relatedCollectionName => {
			const relatedCollection = schema.collections[relatedCollectionName];
			const relatedClassName = className(relatedCollection);
			const relatedPrimaryKey = relatedCollection.primary;
			return `${relatedClassName} | ${relatedClassName}["${relatedPrimaryKey}"]`
		});
		return types.join(" | ");
	}

	throw new Error(`Failed to get type for relation ${JSON.stringify(relation)}`);
}


function aliasToType(field: FieldOverview, collection: Collection, schema: SchemaOverview): string | null {
	const relation = schema.relations.find(r => r?.meta?.one_collection === collection.collection && r?.meta?.one_field === field.field);
	if (!relation) {
		return null;
	}
	return `${className(schema.collections[relation.meta?.many_collection])}[] |  { create: ${className(schema.collections[relation.meta?.many_collection])}[], update: ${className(schema.collections[relation.meta?.many_collection])}[], delete: string[] } `;
}

function fieldTypeToJsType(field: FieldOverview, collection: Collection): string {
	switch (field.type) {
		case "boolean":
			return "boolean";
		case "integer":
		case "float":
		case "decimal":
		case "bigInteger":
			return "number";
		case "dateTime":
		case "date":
		case "time":
		case "timestamp":
			// TODO: Validate this
			return "string";
		case "text":
		case "string":
		case "uuid":
		case "hash":
			return 'string';
		case "json":
			return "any";
		case "csv":
			return "string[]";
		case "alias":
		case "binary":
		case "geometry":
		case "geometry.Point":
		case "geometry.LineString":
		case "geometry.Polygon":
		case "geometry.MultiPoint":
		case "geometry.MultiLineString":
		case "geometry.MultiPolygon":
		case "unknown":
		default:
			throw new Error('Unknown type');
	}
}

async function generateModel(collection: Collection, schema: SchemaOverview, services, database, exportKeyword: 'export' | 'declare', sortFields: boolean): Promise<string> {
	let source = `${exportKeyword} interface ${className(collection)} {\n
		sum?: SumProps<${className(collection)}> | null

		count?: CountProps<${className(collection)}> | number | null
		`;

	const fieldsService = new services.ItemsService('directus_fields', {
		knex: database,
		schema
	});

	const fields: any[] = sortFields ? Object.values(collection.fields).sort(byKey('field')) : Object.values(collection.fields);
	for (const field of fields) {
		let type: string;
		try {
			// This might be a relation
			let relation = field.alias ? aliasToType(field, collection, schema) : fieldToRelationType(field, collection, schema);
			if (relation) {
				type = relation;
			} else {
				// Or this might be an enum
				const fieldItem = (await fieldsService.readByQuery({
					filter: {
						collection: {
							_eq: collection.collection
						},
						field: {
							_eq: field.field
						}
					},
					limit: 1
				}))[0];
				if (fieldItem?.options?.choices?.length) {
					// this is an enum with fixed choices!
					type = fieldItem?.options?.choices
						?.map(choice => typeof choice.value === 'string' ?
							`'${choice.value.replaceAll('\'', '\\\'')}'`
							: choice.value
						)
						?.join(' | ');

					// add array type in case of multi-selection
					if (fieldItem?.interface?.includes('multiple')) {
						type = `(${type})[]`;
					}
				} else {
					// this may just be a plain type
					type = fieldTypeToJsType(field, collection);
				}
			}
			if (field.nullable) {
				type = `${type} | null`;
			}
		} catch (e) {
			console.error(`
				== Missing Field ==
				Failed to get the type for ${collection.collection}.${field.field}. Setting to "never".
				Please report this error: https://github.com/ChappIO/directus-extension-models/issues.


				Stack Trace:`, e, `

				MODEL GENERATION WILL CONTINUE WITHOUT ANY PROBLEM
				`);
			type = 'never';
		}

		source += `
			/**
			 * ${field.note || 'No description.'}
			 *
			 * Type in directus: ${field.type}
			 * Type in database: ${field.dbType || 'no column'}
			 */
			${field.field}?: ${type};\n`
	}
	source += '}\n'

	return source;
}

function byKey<T, K extends keyof T>(key: K) {
	return (a: T, b: T) => a[key] > b[key] ? 1 : -1;
}

function generateIndex(collections: Collection[], exportKeyword: 'declare' | 'export'): string {
	let source = ``;
	source += `
${exportKeyword} type Collections = {
`;
	collections.forEach((collection: Collection) => {
		source += `  ${collection.collection}: ${className(collection)}${collection.singleton ? '' : '[]'};\n`
	});
	source += '}\n';
	return source;
}

export default defineHook(async ({ init }, { services, getSchema, database, logger }) => {
	init('cli.after', ({ program }: any) => {
		const modelTypesCommand: Command = program.command('models')
			.description('Export the currently connected database to .d.ts files');

		modelTypesCommand
			.command('snapshot')
			.description('Export the currently connected database to .d.ts files into <file>')
			.arguments('<file>')
			.option('-g, --global', 'Generate a file with global declarations instead of exports. Just snapshot it into your typescript project as a .d.ts file.', false)
			.option('--no-sort', 'Set --no-sort to disable alphabetic sorting of fields and collection. This defaults to sorting to make git diffs more consistent.', true)
			.action(async function (file: string, opts: any) {
				const schema = await getSchema();
				const collections = schema.collections;
				logger.info(`Exporting models to ${file}`);

				await mkdir(dirname(file), {
					recursive: true,
				});

				let source = ``;
				const exportKeyword = opts.global ? 'declare' : 'export';

				// Generate all classes
				const sortedCollections = opts.sort ? Object.values(collections).sort(byKey('collection')) : Object.values(collections);
				for (let collection of sortedCollections) {
					source += await generateModel(collection, schema, services, database, exportKeyword, opts.sort) + '\n';
				}
				// Generate the index
				source += generateIndex(sortedCollections, exportKeyword);
				source += readFileSync('./ts-types-helpers/index.ts', 'utf-8')
				await writeFile(file, source);
				process.exit(0);
			});
	});
});
