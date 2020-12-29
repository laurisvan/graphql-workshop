import { ApolloServer } from 'apollo-server'
import { createApplication } from 'graphql-modules'
import AssignmentModule from './modules/assignment'
import CommonModule from './modules/common'
import CustomerModule from './modules/customer'
import PersonModule from './modules/person'

import Database from './models/Database'

async function start (): Promise<void> {
  // Initialize GraphQL modules
  const application = createApplication({
    modules: [
      AssignmentModule,
      CustomerModule,
      CommonModule,
      PersonModule
    ]
  })

  // This is the aggregated schema
  const schema = application.createSchemaForApollo()

  // Initialize database. Sequelize creates tables on bootstrapping
  const db = Database.instance
  await db.init()

  // Start the server
  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()
