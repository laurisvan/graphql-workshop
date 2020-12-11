# Bootstrap Your Stack

This chapter bootstraps a simple Node.js/TypeScript/Apollo server stack.

### Initialise the Backend and Tooling Dependencies

The backend setup is included here so that you can perform the installation up-front. Note that you may ignore peer dependency warnings - the provided
setup works just fine.

```sh
# Initilise the stub project
mkdir backend
cd backend
npm init --yes

# Install TypeScript > 3.8 (that Apollo server requires) and ts-node for
# the sake of simplicity
npm install --save-dev typescript ts-node

# CLI utility that we will use to copy the GraphQL schemas to build directory
npm install --save-dev cpy-cli

# Install Apollo Server and GraphQL module
npm install --save apollo-server graphql

# Sequelize dependencies
npm install --save sequelize@5 sequelize-typescript @types/node @types/bluebird reflect-metadata

# Utility library to generate UUIDs server-side
npm install --save uuid @types/uuid

# Postgres dependencies
npm install --save pg

# GQL Modules to easily modularise resolvers
npm install --save graphql-modules

# Setup TypeScript with a good no-nonsense defaults
npm install --save-dev @tsconfig/node14
cat <<EOF >tsconfig.json
{
  "extends": "@tsconfig/node14/tsconfig.json",
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
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
npm install --save-dev eslint@7 eslint-plugin-standard@4 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-standard-with-typescript

cat <<EOF >.eslintrc.json
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
jq -r '.scripts.dev = "nodemon --watch build --watch schema.graphql --exec 'ts-node' ./src/index.ts"' package.json | sponge package.json
jq -r '.scripts.copy_schemas = "cpy **/*schema.graphql ../build/ --parents --cwd=src"' package.json | sponge package.json
jq -r '.scripts.build = "tsc -b --incremental"' package.json | sponge package.json
jq -r '.scripts.build_watch = "tsc -b --watch"' package.json | sponge package.json
```

## References

* [Prisma.io GraphQL Tutorial (includes bootstrapping React App)](https://www.prisma.io/blog/how-to-use-create-react-app-with-graphql-apollo-62e574617cff)
* [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)

## Navigation

* [Previous Chapter](1_Simple_GraphQL_Queries.md)
* [Next Chapter](3_Simple_Backend.md)