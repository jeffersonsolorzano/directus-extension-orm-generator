import type { Accountability, SchemaOverview } from '@directus/types';
import { Knex } from 'knex';
import * as directusServices from "@directus/api/dist/services";
import { CollectionName } from "../../database-schema";
import { Emitter } from "@directus/api/dist/emitter";

export interface DirectusAPILayerConstructor<Meta = any> {
    accountability: Accountability | null,
    directusBackendServices?: typeof directusServices,
    knexInstance?: Knex,
    directusEmitter?: Emitter,
    schema?: SchemaOverview,
    meta?: Meta
    collection?: CollectionName,

}