import { defineHook } from '@directus/extensions-sdk';
import DirectusAPILayer from '../../../../DIRECTUS-API-LAYER/DirectusAPILayer'

export default defineHook(({ filter }, { emitter, services, database, getSchema }) => {
	filter("items.read", async (_, meta, context) => {
		const ApiLayerExample = new DirectusAPILayer({
			accountability: context.accountability,
			schema: await getSchema(),
			"collection": 'UserVehicleAndBusinessTask',
			"directusBackendServices": services,
			"directusEmitter": emitter,
			"knexInstance": database,
			meta
		})


		const manipulationResponse = await ApiLayerExample.directusHandlerAPI('AcademyTutorial',{
			directusRequest:(_,directusInstance) => {
				return directusInstance?.createOne({
					'name':"MY NEW ACADEMY TUTORIAL",
					'status':'archived',
					"urlArticle":"www.myArticle.com"
				})
			}
		})

		console.log("MINULATION_RESPONSE",manipulationResponse)

		const requestResponse = await ApiLayerExample.directusHandlerAPI('AcademyTutorial', {
			'directusRequest': (query, directusInstance) => {
				return directusInstance?.readByQuery(query)
			},
			query: {
				/**
				 * EXAMPLE OF TYPE SAFE SELECTED FIELDS
				 */
				'fields': {
					'id': true,
					'academyTutorialStatus': true,
					'status': true,
					'FkAcademyTutorialToBusinessAcademyTutorial': {
						'id': true,
						'academyTutorialID': true,
						'date_updated': true
					}
				},
				/**
				 * EXAMPLE OF TYPE SAFE FILTER
				 */
				'filter': {
					'_and': [
						{
							'status': {
								'_eq': 'archived'
							}
						},
						{
							'name': {
								'_contains': "Hello there."
							}
						}
					]
				}
				/**
				 * EXAMPLE OF AGREGATE
				 */
				,
				'aggregate': {
					'sum': ['countOfRequest']
				},
				/**
				 * EXAMPLE OF TYPESAFE DEEP FILTER
				 */
				"deep": {
					'FkAcademyTutorialToBusinessAcademyTutorial': {
						'_filter': {
							'BusinessAcademyTutorialStatus': {
								'_eq': 'completed'
							}
						}
					}
				},
				/**
				 * EXAMPLE OF TYPE SAFE GROUP
				 */
				'group': ['academyTutorialStatus'],
				/**
				 * EXAMPLE OF TYPE SAFE SORT
				 */
				'sort': ['-date_created', 'date_updated']
			}
		},'allRelationsNonString')

		console.log("DIRECTUS_RESPONSE", requestResponse)

	});
});
