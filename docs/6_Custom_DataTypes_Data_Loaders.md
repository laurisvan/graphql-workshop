# Custom Scalars, Data Loaders and Oh My!

Now we have a fancy bootstrap of frontend and backend that do very little. We
have Assignments, but we cannot even use date types? We have GraphQL, but where
is the graph of GraphQL (all looks very REST to me). We have storage for
assignments, but no logic to store them.

This chapter adds some real-life use to the API:
1. Custom scalars (using DateTime as an example)
1. Data Loaders (so that we can nest relations to each other)
1. Parametrized Queries and Mutations (so that we can do some real-life work)

## Custom Scalars

The basic GraphQL types are almost as limited (Int, Float, String, Booleanm ID), but you can
extend the types as long as the both ends can parse it and it can be serialised to JSON. Even
multi-part types (like file uploads) are supported.

### Custom Scalars in Backend

A lot of types can be found in [graphql-scalars](https://github.com/Urigo/graphql-scalars#readme)
that we will use in this workshop:

```sh
# Execute in your backend project
npm install --save graphql-scalars
```

Creating your own types is not difficult. Go investigate the source code. We did this as we needed
timezone information into our DateTimes.

You need to declare custom Scalars somewhere. My opinionated best practice is that you can add
shared types and scalars in a common module, so create `src/modules/common/index.ts`:

```typescript
import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'
import { DateTimeResolver } from 'graphql-scalars'

import { IResolvers } from '../../interfaces/schema-typings'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
  DateTime: DateTimeResolver
}

export const CommonModule = createModule({
  id: 'common',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers
})

export default CommonModule

```

As usual, you need to regenerate GraphQL typings to discover the newly added scalar

```sh
npm run generate_types
```

Also declare the new module in your `src/index.ts`

```typescript
import CommonModule from './modules/common'

...

  const application = createApplication({
    modules: [AssignmentModule, CommonModule]
  })
```

And now you can use the common Scalars (and other typings) by introducing a
dependency between modules at `src/modules/assignment/index.ts`:

```typescript
import

...

export const AssignmentModule = createModule({
  id: 'assignments',
  dirname: __dirname,
  imports: [CommonModule],
  typeDefs: typeDefs,
  resolvers,
  providers: [AssignmentProvider]
})

...
```

Now you can use your fancy type and expose the start and end date in your Assignment schema
(`src/modules/assignment/schema.graphql`):

```graphql
type Assignment {
  # A single-line comment
  name: String!
  """
  Multi-line comments are supported here, as well
  """
  description: String
  starts: DateTime!
  ends: DateTime!
}
```

Note that your types will still be mapped as strings in typedefs. We can create a
'scalars map' to remap certain scalars to other types (this will only alter types,
not the runtime). Backend scalar implementation already works alright, but the
frontend needs a bit more help from `apollo-link-scalars` and
`@graphql-codegen/introspection` plugin:

```yaml
overwrite: true
schema: ./src/modules/**/*.graphql
config:
  # We add the interface prefix to types to avoid name clashes
  typesPrefix: I
  scalars:
    DateTime: Date
generates:
  # Frontend typings (uncomment these later)
  ../frontend/src/interfaces/schema-typings.ts:
    documents: ../frontend/src/**/*.graphql
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
  # Backend typings
  ../backend/src/interfaces/schema-typings.ts:
    plugins:
      - 'typescript'
      - 'typescript-resolvers'

```

### Custom Scalars in Frontend

The proper interpretation of custom scalars in frontend is tedious and might
not be worth it (we do not use it currently). If you want to have different scalar
mapping, you can have different config section per generated typings file.

To use the scalars mapping and introspection, install `apollo-link-scalars`:

```sh
# Execute this in frontend
npm install apollo-link-scalars
```

Extend your type generation config () as follows:

```yaml
overwrite: true
schema: ./src/modules/**/*.graphql
config:
  # We add the interface prefix to types to avoid name clashes
  typesPrefix: I
  scalars:
    DateTime: Date
generates:
  # Frontend typings (uncomment these later)
  ../frontend/src/interfaces/schema-typings.ts:
    documents: ../frontend/src/**/*.graphql
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
  # apollo-link-scalars needs this to serialise/deserialise types properly
  # this file may grow and might not always be a good idea.
  ../frontend/src/interfaces/introspection.json:
    plugins:
      - introspection
    config:
      minify: true
  # Backend typings
  ../backend/src/interfaces/schema-typings.ts:
    plugins:
      - 'typescript'
      - 'typescript-resolvers'

```

Now use it in your App bootstrap (`src/App.tsx`) as follows:

```typescript
import React from 'react'
import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ApolloLink, HttpLink } from '@apollo/client/core'
import { buildClientSchema, IntrospectionQuery } from 'graphql'
import { withScalars } from 'apollo-link-scalars'

import AssignmentList from './components/AssignmentList'
import introspectionResult from './interfaces/introspection.json'

// We define a custom mapping to be used by apollo-link-scalars
const schema = buildClientSchema((introspectionResult as unknown) as IntrospectionQuery)
const typesMap = {
  DateTime: {
    serialize: (parsed: Date) => parsed.toJSON(),
    parseValue: (raw: string | null): Date | null => {
      return raw ? new Date(raw) : null;
    }
  }
};
const link = ApolloLink.from([
  withScalars({ schema, typesMap }),
  new HttpLink({ uri: 'http://localhost:4000/' })
]);

const client = new ApolloClient({
  // Note the newly added ApolloLink, e.g. a chain to resolve the network traffic
  link,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Hello, GraphQL Workshop! 🚀</h2>
      </div>
      <AssignmentList></AssignmentList>
    </ApolloProvider>
  )
}

export default App
```

Now regenerate the typings, use the new fields in schema (`src/components/AssignmentList/operations.graphql`):

```graphql
query assignments {
  assignments {
    name
    description
    starts
    ends
  }
}
```

... and regenerate typings one more time:

```sh
# Execute this in your Backend project
npm run generate_types
```

... and finally you can use custom types accross the stack!

### More Modules

Until now we have only worked with Assignments module but have not related it
to Persons and Customers. Now we can finally show the true power of GraphQL,
e.g. give clients the power to retrieve what they want to retrieve, and when.

First we need to create the stub modules to Person and Customer. The current
API is so simple that you can just copy the `assignment` module as a template,
and substitute `assignment` with `customer` and `Assignment` with `Customer`

```sh
cp -R src/modules/assignment src/modules/customer
sed -i '' 's/assignment/customer/g' src/modules/customer/*
sed -i '' 's/Assignment/Customer/g' src/modules/customer/*

cp -R src/modules/assignment src/modules/person
sed -i '' 's/assignment/person/g' src/modules/person/*
sed -i '' 's/Assignment/Person/g' src/modules/person/*
```

You may want to cleanup the schema definitions for obsolete values (Customers
and Persons just need a `name`). You might want to create the queries and 
mutations for them, too.

Then add the new modules into `src/index.ts`:

```typescript
import { ApolloServer } from 'apollo-server'
import { createApplication } from 'graphql-modules'
import AssignmentModule from './modules/assignment'
import CommonModule from './modules/common'
import CustomerModule from './modules/customer'
import OperationsModule from './modules/operations'
import PersonModule from './modules/person'

import Database from './models/Database'

async function start (): Promise<void> {
  // Initialize GraphQL modules
  const application = createApplication({
    modules: [
      AssignmentModule,
      CustomerModule,
      CommonModule,
      OperationsModule,
      PersonModule
    ]
  })

...

```

Now generate types and find the new APIs in your API client and watch your API expand!

```
npm run generate_types
```

### Type Resolvers, Data Loaders and Solving the N+1 Problem

Now that we have more modules, we have the opportunity to do 'joins' via GraphQL.
We can expand the Persons and Customers from within assignments directly, writing
the corresponding resolver to Assignment. However, a naive implementation will
result in N+1 queries (1 to find the Assignments, and N queries for each Person).

The solution for this is DataLoader, which practically waits one tick in Node.js
event loop, queues the queries and redistributes the results back for each caller.

Install the DataLoader dependency

```sh
npm install --save dataloader
```

To resolve Customer from within Assignment, you can first write a DataLoader to
Customer (`src/modules/customer/provider.ts`):

```typescript

...
export class CustomerProvider {
  private readonly loader = new DataLoader<string, Customer | undefined>(
    async (ids: readonly string[]): Promise<Array<Customer | undefined>> => {
      const rows = await Customer.findAll({
        where: {
          // Note: We do the array trick just because Sequelize API is mutable
          // and DataLoader isn't.
          id: [...ids]
        }
      })

      return ids.map(id => rows.find(c => c.id === id))
    },
    { cache: false }
  )

  async findById (id: string): Promise<Customer | undefined> {
    if (!id) {
      return undefined
    }

    return await this.loader.load(id)
  }

...
```

## References

- [GraphQL Types](https://www.apollographql.com/docs/react/get-started/)
- [graphql-scalars](https://github.com/Urigo/graphql-scalars#readme)
- [GraphQL Code Generator, React App Plugin](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo)
- [Composable Networking with Apollo Link](https://www.apollographql.com/docs/link/)
- [Apollo Link Scalars](https://github.com/eturino/apollo-link-scalars)
- [Solving N+1 Problem with GraphQL Modules](https://graphql-modules.com/docs/recipes/data-loader)

## Navigation

* [Previous Chapter](5_Bootstrap_Frontend.md)
* [Next Chapter](7_Authentication_and_Access_Control.md)