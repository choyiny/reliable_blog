import { User } from '../../../db'

export const resolvers = {
  Query: {
    user: (_, args) => {
      return User.findOne({where: args})
    }
  }
}