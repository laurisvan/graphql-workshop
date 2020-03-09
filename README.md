# Introduction

## Prerequisities:

Install the tools you will use:
- [Insomnia](https://insomnia.rest/download/) or another GraphQL client
- [Node.js (v12 LTS or later)](https://nodejs.org/en/download/) used in examples
- [Postgres (any version)](https://www.postgresql.org/download/)
- [Postico](https://eggerapps.at/postico/) or another Postgres database client
- [JQ for CLI JSON manipulation](https://stedolan.github.io/jq/download/) for JSON manipulation - used in a few scripts
- [Sponge from moreutils for CLI JSON manipulation](https://stedolan.github.io/jq/download/) for JSON manipulation - used in a few scripts

Quick'n'dirty setup on OS/X / Homebrew:
```sh
brew cask install insomnia
brew install nodejs
brew install postgres
brew cask install postico
brew install jq moreutils
npm install -g typescript
```

If you are using VS.code (recommended), you will also benefit from the following plugins:
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql)

### Initialise the Backend and Tooling Dependencies

The backend setup is included here so that you can perform the installation up-front

```sh
# Initilise the stub project
mkdir backend
cd backend
npm init --yes

# Install Apollo Server and GraphQL module
npm install --save apollo-server graphql

# Sequelize dependencies
npm install --save sequelize @types/bluebird @types/node @types/validator reflect-metadata sequelize-typescript

# Postgres dependencies
npm install --save pg pg-hstore

# GQL Modules to easily modularise resolvers
npm install --save @graphql-modules/core

# Setup TypeScript - Sindre's tsconfig is a good no-nonsense starter
npm install --save-dev @sindresorhus/tsconfig
cat <<EOF >>tsconfig.json
{
  "extends": "@sindresorhus/tsconfig",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "outDir": "build",
    "target": "es2018",
    "lib": [
      "es2018"
    ]
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

# GraphQL Code Generator dependencies for "specification first" approach
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations \
  @graphql-codegen/typescript-resolvers @graphql-codegen/typescript-react-apollo
jq -r '.scripts.generate_types = "graphql-codegen --config graphql-codegen.yml"' package.json | sponge package.json
cat <<EOF >>./graphql-codegen.yml
overwrite: true
schema: ./schema.graphql
config:
  # We add the interface prefix to types to avoid name clashes
  typesPrefix: I
generates:
  # Frontend typings
  ../frontend/src/lib/GraphQLTypings.tsx:
    plugins:
      - 'typescript'
      - 'typescript-operations'
      - 'typescript-react-apollo'
  # Common schema typings
  ../backend/src/interfaces/schemaTypings.ts:
    plugins:
      - 'typescript'
      - 'typescript-resolvers'
EOF
```



### Nested resolvers

### Custom Types (JSON, UUID etc.)

### Data Loaders (Solving the N+1 Problem & Caching)

## Building a GraphQL Client

### Querying for data

### Mutating data

### Using Fragments (for recurring fetch patterns)

## Supplementary Topics

### Generating Types from Schema

