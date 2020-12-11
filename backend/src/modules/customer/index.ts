import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'

// These are types injected from the generated schema types
import { IResolvers, ICustomer } from '../../interfaces/schema-typings'

import CustomerProvider from './provider'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
  // The resolvers are merged on boot, so you can do your Customer
  // specific extensions to Assignment here
  Assignment: {
    recipient: async (assignment, params, context): Promise<ICustomer> => {
      const provider = context.injector.get(CustomerProvider)

      return provider.findById(assignment.recipientId)
    }
  }
}

export const CustomerModule = createModule({
  id: 'customers',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers,
  providers: [CustomerProvider]
})

export default CustomerModule
