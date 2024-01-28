export interface Businessacademytutorial {

	sum?: SumProps<Businessacademytutorial> | null

	count?: CountProps<Businessacademytutorial> | number | null

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	BusinessAcademyTutorialStatus?: 'pending' | 'seen' | 'completed';

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: char
	 */
	academyTutorialID?: Academytutorial | Academytutorial["id"] | null;

	/**
	 * No description.
	 *
	 * Type in directus: timestamp
	 * Type in database: timestamp
	 */
	date_created?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: timestamp
	 * Type in database: timestamp
	 */
	date_updated?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: uuid
	 * Type in database: char
	 */
	id?: string;

	/**
	 * No description.
	 *
	 * Type in directus: integer
	 * Type in database: int
	 */
	sort?: number | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	status?: 'published' | 'draft' | 'archived';

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: char
	 */
	user_created?: DirectusUser | DirectusUser["id"] | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: char
	 */
	user_updated?: DirectusUser | DirectusUser["id"] | null;
}

export interface DirectusUser {

	sum?: SumProps<DirectusUser> | null

	count?: CountProps<DirectusUser> | number | null

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	appUserSingInMethod?: 'email' | 'socialMedia_Google' | 'socialMedia_FB' | 'socialMedia_Apple' | 'phoneNumber' | 'anonymus' | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	appUserType?: 'ownerVehicle' | 'workshop' | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	appearance?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: json
	 * Type in database: json
	 */
	auth_data?: any | null;

	/**
	 * No description.
	 *
	 * Type in directus: text
	 * Type in database: text
	 */
	description?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	email?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	email_notification?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: boolean
	 * Type in database: boolean
	 */
	email_notifications?: boolean | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	external_identifier?: string | null;

	/**
	 * ID de usuario de firebase
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	firebaseUserUID?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	first_name?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: json
	 * Type in database: json
	 */
	gender?: ('male' | 'Female')[] | null;

	/**
	 * No description.
	 *
	 * Type in directus: uuid
	 * Type in database: char
	 */
	id?: string;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	internalUserType?: 'admin' | 'commercial_agent' | 'commercial_manager' | null;

	/**
	 * No description.
	 *
	 * Type in directus: boolean
	 * Type in database: boolean
	 */
	isAppUser?: boolean | null;

	/**
	 * No description.
	 *
	 * Type in directus: boolean
	 * Type in database: boolean
	 */
	isInternalUser?: boolean | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	language?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: timestamp
	 * Type in database: timestamp
	 */
	last_access?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	last_name?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	last_page?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	location?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: hash
	 * Type in database: varchar
	 */
	password?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	phoneNumber?: string | null;

	/**
	 * Codigo de pais de numero de telefono de el usuario
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	phoneNumberCode?: '503' | null;

	/**
	 * URL de foto de perfil de usuario
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	profilePictureURL?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	provider?: string;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	status?: string;

	/**
	 * No description.
	 *
	 * Type in directus: json
	 * Type in database: json
	 */
	tags?: any | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	tfa_secret?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	theme_dark?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: json
	 * Type in database: json
	 */
	theme_dark_overrides?: any | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	theme_light?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: json
	 * Type in database: json
	 */
	theme_light_overrides?: any | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	title?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	token?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	whatsappNumber?: string | null;

	/**
	 * Codigo de pais de numero de telefono de el usuario
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	whatsappNumberCode?: '503' | null;
}

export interface Academytutorial {

	sum?: SumProps<Academytutorial> | null

	count?: CountProps<Academytutorial> | number | null

	countOfRequest?: number | null

	/**
	 * No description.
	 *
	 * Type in directus: alias
	 * Type in database: no column
	 */
	FkAcademyTutorialToBusinessAcademyTutorial?: Businessacademytutorial[] | { create: Businessacademytutorial[], update: Businessacademytutorial[], delete: string[] } | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	academyTutorialStatus?: 'deprecated' | 'active' | null;

	/**
	 * No description.
	 *
	 * Type in directus: timestamp
	 * Type in database: timestamp
	 */
	date_created?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: timestamp
	 * Type in database: timestamp
	 */
	date_updated?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: uuid
	 * Type in database: char
	 */
	id?: string;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	name?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: integer
	 * Type in database: int
	 */
	sort?: number | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	status?: 'published' | 'draft' | 'archived';

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	url?: string;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: varchar
	 */
	urlArticle?: string | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: char
	 */
	user_created?: DirectusUser | DirectusUser["id"] | null;

	/**
	 * No description.
	 *
	 * Type in directus: string
	 * Type in database: char
	 */
	user_updated?: DirectusUser | DirectusUser["id"] | null;
}


export type Collections = {
	AcademyTutorial: Academytutorial[];
}

type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

/**
 * Extracting type props
 */
export type CollectionName = Prettify<keyof Collections>

/**
 * GETTING INTERFACE DINAMICALLY BY NAME
 */
export type ItemIn<CollectionKey extends CollectionName> =
	Collections[CollectionKey] extends (infer Item extends Record<string, any>)[]
	? Item
	: Collections[CollectionKey]


/**
 * UNIFING TYPES AS A POSSIBLE VALUE TYPE AS AN ARRAY
 */
export type CollectionsUnion = Collections[keyof Collections];

/**
 * UNIFING TYPES AS A POSSIBLE VALUE TYPE AS A SINGULAR ITEM
 */
export type CollectionTypes<T> = {
	[K in keyof T]: T[K] extends Array<infer U> ? U : T[K];
};
export type PossibleCollections = CollectionTypes<Collections>[keyof Collections];

/**
 * CONVERT ALL TYPES INTO A SINGULAR REQUIRED TYPE 
 */
export type TypesIntersection<T> = T extends any ? (arg: T) => void : never;
export type AllCollectionAsSingular = TypesIntersection<PossibleCollections> extends (arg: infer U) => void ? U : never;


/**
 * RELATION AS NON STRING
 */
// Type that conditionally checks if a type 'T' is an array and applies recursion if so
export type RelationNotString<T> = T extends (infer U)[] ? RelationNotString<U>[] : {
	// For each property 'P' in the object 'T'
	[P in keyof T]:
	// If 'AllCollectionAsSingular & AllCollectionAsSingular[]' is a subset of 'T[P]'
	AllCollectionAsSingular & AllCollectionAsSingular[] extends T[P] ?
	// Check if 'T[P]' is an array and apply recursion if so
	T[P] extends (infer G)[] ? RelationNotString<G[]> :
	// Exclude strings from 'RelationNotString' of 'T[P]'
	Exclude<RelationNotString<T[P]>, string> :
	// If the condition is not met, take the original type 'T[P]'
	T[P];
}


/**
 * INTERFACE TO BOOLEAN
 */
export type BooleanProps<T, Functions extends AllDirectusFunction[] = AllDirectusFunction[]> =
	T extends (infer U)[] ?
	objectRequest<U, Functions> :
	objectRequest<T, Functions>;

type objectRequest<T, Functions extends AllDirectusFunction[]> =
	T extends object ?
	{ [K in keyof T | `${Functions[number]}(${keyof T})`]?: BooleanProps<T[K], Functions> }
	: boolean;

/**
 * GROUP
 */
export type CustomGroupFunction = 'year' | 'month' | 'week' | 'day' | 'weekday' | "hour" | "minute" | "second";
export type ArrayFunctions = "count"
export type AllDirectusFunction = CustomGroupFunction | ArrayFunctions

export type CustomGroup<T, Functions extends CustomGroupFunction[] = CustomGroupFunction[]> = T extends object
	? T extends (infer U)[]
	? CustomGroup<U, Functions> // Apply custom filters to each element in the array
	/**
	 * TODO: check how to delete warning
	 */
	//@ts-ignore
	: keyof T | `${Functions[number]}${keyof T}` : never;


/**
* AGGREGATE
*/
export type CustomAggregate<T> = T extends object
	? T extends (infer U)[]
	? CustomAggregate<U> // Apply custom filters to each element in the array
	: T extends (string | number | boolean) & null & undefined
	? never // Exclude properties of type string | number | boolean | null
	: CustomAggregation<keyof T> // Recursive call for non-array objects
	: never;

type CustomAggregation<T> = {
	avg?: string[];
	avgDistinct?: string[];
	count?: T[] | "*"[];
	countDistinct?: T[];
	sum?: T[]
	sumDistinct?: string[];
	min?: string[];
	max?: string[];
};


/**
 * ALIAS
 */
export type Aliases<T> = {
	[x: string]: keyof T
}
/**
 * DEEP FILTERS
  * T:Tipo principal al que se evaluara
 * K: Nombre de la Key
 * T[K]: Tipo de dato de la key
 */
export type CustomNestedDeepQuery<T> = T extends object ? T extends (infer U)[] ? CustomNestedDeepQuery<U> : {
	[K in keyof T]: CustomNestedDeepQuery<T[K]> & CustomDeepQuery<T[K]>
} : never



export type CustomDeepQuery<T> = {
	_fields?: string[] | null;
	_sort?: SortByKeys<T>[] | null;
	_filter?: CustomFilter<T> | null;
	_limit?: number | null;
	_offset?: number | null;
	_page?: number | null;
	_search?: string | null;
	_group?: CustomGroup<T, CustomGroupFunction[]>[] | null;
	_aggregate?: CustomAggregate<T> | null;
};

/**
 * FILTERS
 */
// Definition of a generic type named CustomFilter that takes a parameter T
export type CustomFilter<T, Functions extends CustomGroupFunction[] = CustomGroupFunction[]> = T extends object ?
	// If T is an array (infer U is the type of array elements)
	T extends (infer U)[]
	// Apply custom filters to each element in the array
	? CustomFilter<U> | { _some?: CustomFilter<U>, _none?: CustomFilter<U> } | undefined
	// If T is not an array, apply custom filters to each property of the object
	: {
		//TODO: add type safe for | ()${Functions[number]}(${K})() | ()count(${keyof T})()
		[K in keyof T]?: CustomFilter<T[K]>
		//| CustomDeepQuery<T[K]>;
	} | CustomLogicalFilter<T> | CustomFieldFilter<T>
	// If T is not an object, the type is "never" (this case will never be reached)
	: never;

// Definition of a generic type named CustomLogicalFilter that can be either an OR or AND logical filter
type CustomLogicalFilter<T> = LogicalFilterOR<T> | LogicalFilterAND<T>;

// Definition of a type for an OR logical filter
type LogicalFilterOR<T> = {
	_or: CustomFilter<T>[];
};

// Definition of a type for an AND logical filter
type LogicalFilterAND<T> = {
	_and: CustomFilter<T>[];
};

// Definition of a type for a custom field filter in an object
type FieldValidationOperator = {
	_submitted?: boolean;
	_regex?: string;
};
type FilterOperator = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'nin' | 'null' | 'nnull' | 'contains' | 'ncontains' | 'icontains' | 'between' | 'nbetween' | 'empty' | 'nempty' | 'intersects' | 'nintersects' | 'intersects_bbox' | 'nintersects_bbox';
type ClientFilterOperator = FilterOperator | 'starts_with' | 'nstarts_with' | 'istarts_with' | 'nistarts_with' | 'ends_with' | 'nends_with' | 'iends_with' | 'niends_with' | 'regex';

type CustomFieldFilter<T> = {
	// For each property (field) in the object, the value can be a field filter operator or a field validation operator
	[F in keyof T]: FieldFilterOperator<T[F], F> | FieldValidationOperator | ClientFilterOperator;
};

type ForceCurrentTypeOnly<T> = T extends object
	? T extends (infer U)[]
	? Exclude<U, null | undefined> : T : T extends string
	? T : T extends number
	? T : T extends boolean
	? T : T | null | undefined



/**
 * TODO: evaluate how to make it work
 */
type CustomDinamicVariables<KEY extends string | number | symbol> = KEY extends 'user_created' ? "$CURRENT_USER" : never

type FieldFilterOperator<P, KEY extends string | number | symbol> = {
	_eq?: CustomDinamicVariables<KEY> | ForceCurrentTypeOnly<P>
	_neq?: ForceCurrentTypeOnly<P>
	_in?: ForceCurrentTypeOnly<P>[];
	_nin?: ForceCurrentTypeOnly<P>[]
	_between?: ForceCurrentTypeOnly<P>[];
	_nbetween?: ForceCurrentTypeOnly<P>[];
	_lt?: string | number;
	_lte?: string | number;
	_gt?: string | number;
	_gte?: string | number;
	_null?: boolean;
	_nnull?: boolean;
	_contains?: string;
	_ncontains?: string;
	_icontains?: string;
	_starts_with?: string;
	_nstarts_with?: string;
	_istarts_with?: string;
	_nistarts_with?: string;
	_ends_with?: string;
	_nends_with?: string;
	_iends_with?: string;
	_niends_with?: string;
	_empty?: boolean;
	_nempty?: boolean;
	_intersects?: string;
	_nintersects?: string;
	_intersects_bbox?: string;
	_nintersects_bbox?: string;
};

/**
 * Sorting by keys
 * TODO: evaluate how to ignore nested objects 
 */

export type SortByKeys<T> = T extends object
	? T extends (infer U)[]
	? SortByKeys<U> : keyof T | `-${keyof T}` : never

/**
 * Count prop for all internal props
 */

export type CountProps<T> = T extends object ?
	T extends (infer U)[] ? number : {
		[K in keyof T]?: number;
	} : never

/**
 * Sum prop for all internal prop
 */

export type SumProps<T> = T extends object ?
	T extends (infer U)[] ? any : {
		[K in keyof T]?: number | null;
	} : never

/**
 * DIRECTUS REQUEST USE MODES
 */
export type DirectusRequestUseMode = "allRelationsNonString" | "default"

/**
 * DIRECTUS RESPONSE STRUCTURE VALIDATOR
 */

export type DirectuAPIRequestReturn<
	T extends DirectusRequestUseMode,
	mainObject, // Represents the main object type
> =
	T extends 'allRelationsNonString' ? RelationNotString<mainObject> :
	// If neither 'strict' nor 'typingOnly', it returns the current type
	mainObject;