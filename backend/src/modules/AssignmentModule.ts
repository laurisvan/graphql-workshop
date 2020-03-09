import { GraphQLModule } from '@graphql-modules/core'
import { IResolvers, IAssignment } from '../interfaces/schemaTypings'
import Assignment from '../models/Assignment'

const resolvers: IResolvers = {
  Query: {
    assignments: async (): Promise<IAssignment[]> => {
      return Assignment.findAll()
    }
  }
}

export default new GraphQLModule({
  resolvers
})