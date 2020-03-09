import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'
import { GraphQLModule } from '@graphql-modules/core';
import Database from './models/Database'
import AssignmentModule from './modules/AssignmentModule'

// Load schema from an external file (relative to build directory).
const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql'))
const typeDefs = gql`${schema}`

async function start() {
  // Initialize database
  const db = Database.instance
  await db.init()

  // Define the root module wrapper to split resolvers.
  // Note: Contrary to the normal setup we do not modularise schema definitions
  const root = new GraphQLModule({
    typeDefs,
    // Add these when the corresponding modules have been written
    imports: [ AssignmentModule ]
  })

  // Start the server
  const server = new ApolloServer({
    modules: [root],
    context: session => session
  })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

start()