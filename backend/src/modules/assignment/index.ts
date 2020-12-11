import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'

// These are types injected from the generated schema types
import { IResolvers } from '../../interfaces/schema-typings'

import AssignmentProvider from './provider'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
}

export const AssignmentModule = createModule({
  id: 'assignments',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers,
  providers: [AssignmentProvider]
})

export default AssignmentModule
