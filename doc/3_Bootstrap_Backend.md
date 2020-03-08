# Bootstrap a Node.js/TypeScript/Apollo Server stack

This section helps to bootstrap a a basic Apollo Server stack that uses
TypeScript. You will likely want to fine tune it for your preferences later.

## Initialise the server project

```sh
# Initilise the stub project
mkdir backend
cd backend
npm init --yes
```

##  Install Tooling Dependencies

```sh
#  Setup TypeScript - Sindre's tsconfig is a good no-nonsense starter
npm install --save-dev @sindresorhus/tsconfig
cat <<EOF >>tsconfig.json
{
  "extends": "@sindresorhus/tsconfig",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "lib": [
      "es2018"
    ],
    "outDir": "build",
    "target": "es2018"
  }
}
EOF

# Install nodemon to auto-restart app on source changes
npm install --save-dev nodemon

# Use "JS Standard" ruleset with TypeScript modifications. Also add TypeScript
npm install --save-dev typescript eslint@6 eslint-plugin-standard@4 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@2 eslint-config-standard-with-typescript
cat <<EOF >>.eslintrc.json
{
  "extends": "standard-with-typescript",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
EOF

# Alter package.json: Change main entry point, append TypeScript build steps
jq '.main = "build/index.js"' package.json | sponge package.json
jq -r '.scripts.start = "node ."' package.json | sponge package.json
jq -r '.scripts.watch = "nodemon --watch build --watch schema.graphql"' package.json | sponge package.json
jq -r '.scripts.build = "tsc -b --incremental"' package.json | sponge package.json
jq -r '.scripts.build_watch = "tsc -b --watch"' package.json | sponge package.json
```

## Install Backend Dependencies

Install the dependencies we will need in the first phase:

```sh
npm install --save apollo-server graphql
```

### Create a Minimal Server and Schema

Then create a basic "Hello world, in GraphQL" app:

```sh
mkdir src
cat <<EOF >>src/index.ts
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
}

async function start() {
  // Start the server
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

start()
EOF
```

Create a Schema it refers to:

```sh
cat <<EOF >>schema.graphql
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

# Restart server on schema or build changes
npm run watch

# Now the backend is responding on port 4000; also serves GraphLQ Playground
open http://localhost:4000
```

## References

* [Get started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
* [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)
* [@sindresorhus/tsconfig](https://www.npmjs.com/package/@sindresorhus/tsconfig)
