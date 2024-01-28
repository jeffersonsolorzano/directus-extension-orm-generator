# DIRECTUS MODEL GENERATOR TYPES
This extension lets you create a new file with you proyect database structure.
It tries to manage request in a simple way, just like an ORM would do, it is inspired in how prisma works

# Usage
- Build directus-extension-db-operations bundle 
- Set ts-types-helpers folder at the root of the proyect
- execute the command:

```
directus models snapshot ./database-schema.ts
```

Then the extension will build the entire database schema, ready to be used with directus backend services.

# Important points
- The configurations are made to be used with "DirectusAPILayer" class, it has all the methods and TS configurations
to let the system understand how to handle the database schema
- Sometimes in some propieties like directus' 'group' might appear some relational fields as options, I will check how
to let TS undertand that it has to ignore all those fields

# How it works
You have to create a 'DirectusAPILayer' class instance, the use `ApiLayerExample.directusHandlerAPI` method,
it will suggest you which table you want to request or manipulate information.

*I have tried only with services that comes from extensions, if you want to use it with the sdk, try adding some configurations to
'DirectusAPILayer' class*

# Configurations
- If you are getting information from relational fields, sometimes the type could be 'string | relation', so you can specify  
'allRelationsNonString' to let the system know that the only type that you want to use is 'relation'

# Examples
There's a how to use exampel at directus-extension-testing-bundle bundle

# Code examples:

```typescript
const ApiLayerExample = new DirectusAPILayer({
    accountability: context.accountability,
    schema: await getSchema(),
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
```


# Suggestions
In case you have any suggestions or want to contribute, let me know :)

# Credits
- This code is inspired in 'directus-extension-models' made by: Thomas Biesaart, you can check the original extension here: 
https://github.com/chappio/directus-extension-models
