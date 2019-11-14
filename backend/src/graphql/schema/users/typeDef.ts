export const typeDef = `
  type User {
    id: ID
    createdAt: Date
    updatedAt: Date
    email: String
    posts: [Post]
    comments: [Comment]
    firstName: String
    lastName: String
    middleName: String
  }

  extend type Query {
    user(id: ID): User
  }
`