# A Simple Backend

This chapter helps to bootstrap a a basic Apollo Server stack that uses
TypeScript. You will likely want to fine tune it for your preferences later.

### Create a Minimal Server and Schema

Then create a basic "Hello world, in GraphQL" app at `src/index.ts`:

```
import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'

// Load schema from an external file (relative to build directory).
const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql'))
const typeDefs = gql`${schema}`

// Define resolvers to load
const resolvers = {
  Query: {
    hello: () => 'Hello, world!'
  },

  Mutation: {
    echo: (parent: any, { input }: { input: string }) => `You typed ${input}`
  }
}

async function start (): Promise<void> {
  // Start the server
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()
```

Create a Schema it refers to:

```sh
cat <<EOF >schema.graphql
# All Queries (e.g. not nested resolvers)
type Query {
  hello: String
}

# All mutations
type Mutation {
  echo (input: String!): String
}

EOF
```

## Run the Server

The stack is now ready for running. If you added the NPM scripts in the previous
chapter, you should be able to start 'dev' script:

```sh
# Restarts and builds from scratch on every file change:
npm run dev

# Now the backend is responding on port 4000; also serves GraphQL Playground
open http://localhost:4000
```

## References

* [Get started with Apollo Server](https://www.apollographql.com/apollo-server/getting-started/)

## Navigation

* [Previous Chapter](2_Bootstrap.md)
* [Next Chapter](4_Refined_Backend.md)