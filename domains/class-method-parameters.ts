import type { Query } from '@directus/types';
import type { ItemsService } from "@directus/api/dist/services";
import {
  CollectionName, Aliases,
  BooleanProps, CustomAggregate,
  CustomFilter, CustomGroup, CustomGroupFunction,
  CustomNestedDeepQuery, DirectuAPIRequestReturn,
  DirectusRequestUseMode, ItemIn, SortByKeys
} from "../database-schema";

export interface DirectusBackendAPIOptions {
  isAdminExecution?: boolean,
}

export interface DirectusHandlerAPIParameters<C extends CollectionName, RequestUseMode extends DirectusRequestUseMode, R> {
  directusRequest: (query: Query, directusInstance: ItemsService<DirectuAPIRequestReturn<RequestUseMode, ItemIn<C>>> | undefined) => R,
  options?: DirectusBackendAPIOptions
  query?: {
    alias?: Aliases<ItemIn<C>>
    fields?: BooleanProps<ItemIn<C>>,
    filter?: CustomFilter<ItemIn<C>>,
    group?: CustomGroup<ItemIn<C>, CustomGroupFunction[]>[]
    aggregate?: CustomAggregate<ItemIn<C>>,
    limit?: number
    offset?: number,
    deep?: CustomNestedDeepQuery<ItemIn<C>>,
    sort?: SortByKeys<ItemIn<C>>[]
  }
}