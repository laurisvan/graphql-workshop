# Bootstrap a Node.js/TypeScript/Apollo Server stack

This section helps to bootstrap a a basic Apollo Server stack that uses
TypeScript. You will likely want to fine tune it for your preferences later.

### Create a Minimal Server and Schema

Then create a basic "Hello world, in GraphQL" app:

```sh
mkdir src

# Note: $ and ` strings are escaped with \
cat <<EOF >src/index.ts
import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'

// Load schema from an external file (relative to build directory).
const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql'))
const typeDefs = gql\`\${schema}\`

// Define resolvers to load
const resolvers = {
  Query: {
    hello: () => 'Hello, world!'
  },
}

async function start() {
  // Start the server
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await server.listen()
  console.log(\`🚀 Server ready at \${url}\`)
}

start()
EOF
```

Create a Schema it refers to:

```sh
cat <<EOF >schema.graphql
# All Queries (e.g. not nested resolvers)
type Query {
  hello: String
}
EOF
```

## Run the Server

The stack is now ready for running. Start the each on different shells:

```sh
# Rebuild on file changes (*.ts)
npm run build_watch

# Restart server on schema or build changes in a different shell
npm run watch

# Now the backend is responding on port 4000; also serves GraphLQ Playground
open http://localhost:4000
```

## References

* [Get started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
* [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)
* [@sindresorhus/tsconfig](https://www.npmjs.com/package/@sindresorhus/tsconfig)
