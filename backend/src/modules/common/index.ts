import fs from 'fs'
import path from 'path'
import { createModule, gql } from 'graphql-modules'
import { DateTimeResolver } from 'graphql-scalars'

import { IResolvers } from '../../interfaces/schema-typings'

const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'))
const typeDefs = gql(data.toString())

const resolvers: IResolvers = {
  DateTime: DateTimeResolver
}

export const CommonModule = createModule({
  id: 'common',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers
})

export default CommonModule
