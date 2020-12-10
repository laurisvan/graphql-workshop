# Bootstrap the Frontend and Dive Deeper into Queries

This chapter bootstraps a simple React/Apollo Client app that connects your backend.

## Bootstrap a Vanilla React App

If you do not have create-react-app already, install it now.

```sh
# Move to the parent directory, so that your frontend will be created on the
# same level as backend
cd ..

# Generate a blank project with Create-React-App
npx create-react-app frontend --template typescript

# Add the needed dependencies
npm install @apollo/client graphql react-router --save

# Start
cd frontend
npm start
```

Modify your `src/App.tsx` so that it nests ApolloProvider on top of the component
tree. This gives you access to Apollo Client anywhere from the app.

```typescript
import React from 'react'
import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'localhost:3000/',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Hello, GraphQL Workshop! 🚀</h2>
      </div>
    </ApolloProvider>
  )
}

export default App

```

## Generate Simple Queries With GraphQL CodeGen

This example shows one way of utilising generated types - React hooks. You can also use
React Components or even use a vanilla client. We use hooks for the sake of creating a
simple, but no-nonsense sample application.

Restructure your graphql-codegen configuration (`../backend/graphql-codegen.yml`) as follows:

```yaml
overwrite: true
schema: ./src/modules/**/*.graphql
config:
  # We add the interface prefix to types to avoid name clashes
  typesPrefix: I
generates:
  # Frontend typings (uncomment these later)
  ../frontend/src/interfaces/schema-typings.ts:
    # near-operation-file preset generates the code adjacent to the graphql
    # documents. The documents specify the actual GraphQL queries.
    preset: near-operation-file
    presetConfig:
      extension: .generated.ts
      baseTypesPath: .
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

This setup now expects that frontend will have component specific GraphQL operations,
each defined in their own `.graphql` file. This is an opinionated choice - after two
years of developed with operations shared between the components we found it
difficult to maintain, as the components had each their unique needs for data, and
adding the superset of them all to queries created excessively heavy queries.

Note that your schema does not necessarily need to be loaded from disk. If you
were working on a frontend project, you could generate the schema from e.g.
`http://localhost:4000/api/graphql`.

Now let us add a sample query at `src/components/AssignmentList/operations.graphql`:

```graphql
query assignments {
  assignments {
    name
    description
  }
}
```

And then we are ready to re-generate the graphql typings

```sh
# Execute this in your Backend project
npm run generate_types
```

Now observe `src/components/AssignmentList/operations.generated.ts` - it now contains
type `IAssignment` that we can use; generated DocumentNode `AssignmentsDocument` that
can be used with Apollo `useQuery` method, and a wrapper `useAssignmentsQuery` that
combines them as a type-safe method call.

## Using the Generated Queries and Data

Now we can create `src/components/AssignmentList/index.tsx`:

```typescript
import React from 'react'
// Note how we can use the generated query and types directly
import { useAssignmentsQuery, AssignmentsDocument } from './operations.generated'
import { useQuery, gql } from '@apollo/client'

const AssignmentList = () => {
  // Note: This is a typed wrapper to Apollo useQuery() method
  const { loading, error, data } = useAssignmentsQuery({})

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error: { JSON.stringify(error)}</div>
  }

  return <ul>
    {data?.assignments.map(assignment =>
      <li>Name: {assignment.name}</li>
    )}
  </ul>
}

export default AssignmentList

```

## References

- [Get Started with Apollo Client](https://www.apollographql.com/docs/react/get-started/)
- [GraphQL Code Generator, React App Plugin](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo)

## Navigation

* [Previous Chapter](4_Refined_Backend.md)
* [Next Chapter](6_Custom_DataTypes_Data_Loaders.md)