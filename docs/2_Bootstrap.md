# Bootstrap your stack

### Initialise the Backend and Tooling Dependencies

The backend setup is included here so that you can perform the installation up-front

```sh
# Initilise the stub project
mkdir backend
cd backend
npm init --yes

# Install TypeScript > 3.8 (that Apollo server requires)
npm install --save-dev typescript

# Install Apollo Server and GraphQL module
npm install --save apollo-server graphql

# Sequelize dependencies
npm install --save sequelize sequelize-typescript @types/node @types/bluebird reflect-metadata

# Postgres dependencies
npm install --save pg

# GQL Modules to easily modularise resolvers
npm install --save @graphql-modules

# Setup TypeScript - Sindre's tsconfig is a good no-nonsense starter
npm install --save-dev @tsconfig/node14
cat <<EOF >tsconfig.json
{
  "extends": "@tsconfig/node14/tsconfig.json",
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
npm install --save-dev eslint@7 eslint-plugin-standard@4 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@3 eslint-config-standard-with-typescript
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
jq -r '.scripts.build = "tsc -b --incremental"' package.json | sponge package.json
jq -r '.scripts.build_watch = "tsc -b --watch"' package.json | sponge package.json