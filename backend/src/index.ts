import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'
import Database from './models/Database'

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
  // Initialize database
  const db = Database.instance
  await db.init()

  // Start the server
  const server = new ApolloServer({ typeDefs, resolvers })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

start()