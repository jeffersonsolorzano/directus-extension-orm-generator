import { Emitter } from "@directus/api/dist/emitter";
import type { ItemsService } from "@directus/api/dist/services";
import * as directusServices from "@directus/api/dist/services";
import type { Accountability, Aggregate, Filter, NestedDeepQuery, SchemaOverview } from '@directus/types';
import { Knex } from 'knex';
import { BooleanProps, CollectionName, DirectuAPIRequestReturn, DirectusRequestUseMode, ItemIn } from "../database-schema";
import { DirectusAPILayerConstructor } from './../domains/class-constructor-parameters';
import { DirectusBackendAPIOptions, DirectusHandlerAPIParameters } from './../domains/class-method-parameters';

class DirectusAPILayer<Meta = any> {
    protected readonly directusBackendServices?: typeof directusServices;
    protected readonly knexInstance?: Knex
    protected readonly accountability?: Accountability | null;
    protected readonly directusEmitter?: Emitter
    protected readonly schema?: SchemaOverview;
    protected readonly meta?: Meta | null
    protected readonly collection?: CollectionName
    constructor({ accountability, directusBackendServices, directusEmitter, knexInstance, schema, collection, meta }: DirectusAPILayerConstructor<Meta>) {
        this.accountability = accountability
        this.directusBackendServices = directusBackendServices
        this.directusEmitter = directusEmitter
        this.knexInstance = knexInstance
        this.schema = schema;
        this.meta = meta
        this.collection = collection
    }


    protected directusBackendAPI<C extends CollectionName, RequestUseMode extends DirectusRequestUseMode>(
        collectionName: C,
        _: RequestUseMode = "default",
        options?: DirectusBackendAPIOptions | undefined): ItemsService<DirectuAPIRequestReturn<RequestUseMode, ItemIn<C>>> | undefined {

        if (this.directusBackendServices && this.schema)
            return new this.directusBackendServices.ItemsService(collectionName,
                {
                    'knex': this.knexInstance,
                    'accountability': options?.isAdminExecution ? { admin: true, role: null } : this.accountability,
                    'schema': this.schema
                });
    }

    /**
     * 
     * @param collectionName Collection to be requested/maniupaled, based on this all collection structure will
     * be setted dinamically
     * @param options Request custom options like filters, fields to request, groups, admin execution, etc...
     * @param requestUseMode Options:
     * - default All relaitons will be setted as possible object/string
     * - allRelationsNonString All relational data will be configured as object only
     * @returns 
     */
    async directusHandlerAPI<C extends CollectionName, Result, RequestUseMode extends DirectusRequestUseMode>(collectionName: C,
        { query, directusRequest, options }: DirectusHandlerAPIParameters<C, RequestUseMode, Result>,
        requestUseMode: RequestUseMode = 'default'
    ) {
        /**
         * TODO: Evaludate how to return only requested fields in the interface, this new interface must come form 
         * 'group','aggregate' or 'fields'
         */
        return await directusRequest({
            fields: this.directusQueryHandler(collectionName, query?.fields),
            filter: query?.filter as Filter,
            'aggregate': query?.aggregate as Aggregate,
            group: query?.group,
            'offset': query?.offset,
            'limit': query?.limit,
            'deep': query?.deep as NestedDeepQuery,
            'sort': query?.sort as string[],
            'alias': query?.alias as Record<string, string>
        }, this.directusBackendAPI(collectionName, requestUseMode, options))
    }

    /**
     * Creates an array of props to be requested in the current collection
     * @param collectionName Collection to be requested
     * @param collectionFields Collection fields to be requested
     * @param parentKey 
     * @returns 
     */
    private directusQueryHandler<C extends CollectionName>(
        collectionName: C,
        collectionFields?: BooleanProps<ItemIn<C>> | BooleanProps<ItemIn<C>>[Extract<keyof BooleanProps<ItemIn<C>>, string>],
        parentKey = '') {

        let request: string[] = [];

        for (const key in collectionFields) {
            if (collectionFields.hasOwnProperty(key)) {
                const actualKey = parentKey ? `${parentKey}.${key}` : key;

                if (typeof collectionFields[key] === 'object' && collectionFields[key] !== null) {
                    request = request.concat(this.directusQueryHandler(collectionName, collectionFields[key], actualKey));
                } else {
                    request.push(actualKey);
                }
            }
        }

        return request;
    }
}


export default DirectusAPILayer