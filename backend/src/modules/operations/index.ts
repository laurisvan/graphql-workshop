import fs from 'fs'
import path from 'path'

import { createModule, gql } from 'graphql-modules'
import { IResolvers, IAssignment, ICustomer, IPerson } from '../../interfaces/schema-typings'
import AssignmentProvider from '../assignment/provider'
import CustomerProvider from '../customer/provider'
import PersonProvider from '../person/provider'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
  Query: {
    assignments: async (parent, args, context, info): Promise<IAssignment[]> => {
      const provider = context.injector.get(AssignmentProvider)

      return provider.find()
    },
    customers: async (parent, args, context, info): Promise<ICustomer[]> => {
      const provider = context.injector.get(CustomerProvider)

      return provider.find()
    },
    persons: async (parent, args, context, info): Promise<IPerson[]> => {
      const provider = context.injector.get(PersonProvider)

      return provider.find()
    }
  },
  Mutation: {
    createAssignment: async (parent, { input }, context, info): Promise<IAssignment> => {
      const provider = context.injector.get(AssignmentProvider)

      return provider.create(input)
    },
    createCustomer: async (parent, { input }, context, info): Promise<ICustomer> => {
      const provider = context.injector.get(CustomerProvider)

      return provider.create(input)
    },
    createPerson: async (parent, { input }, context, info): Promise<IPerson> => {
      const provider = context.injector.get(PersonProvider)

      return provider.create(input)
    }
  }
}

export const OperationsModule = createModule({
  id: 'operations',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers
})

export default OperationsModule
