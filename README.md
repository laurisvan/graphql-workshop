# GraphQL Workshop

## Learning outcome

As a part of this workshop, we will

1. Perform simple GraphQL queries on top of an existing API
1. Bootstrap a basic Node.js/TypeScript/Apollo Server stack
1. Write a simple "Hello World" GraphQL API
1. Modularise the API into a few modules doing real-world operations against database
1. Write a simple React frontendto connect to the backend
1. Add custom datatypes and write faster resolvers using Data Loaders
1. Add JWT based authentication & role based access control

## Prerequisities

To participate this workshop, the following skills are expected:
* Writing simple Node.js / TypeScript applications
* Writing simple React apps (using create-react-app)

This workshop will use the following tools:
- [Insomnia](https://insomnia.rest/download/) or another GraphQL client
- [Node.js (v14 LTS or later)](https://nodejs.org/en/download/) used in examples
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
```

If you are using VS.code (recommended), you will also benefit from the following plugins:
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql)

