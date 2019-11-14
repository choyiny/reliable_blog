export const typeDef = `
  type Post {
    id: ID
    title: String
    body: String
    createdAt: Date
    updatedAt: Date
    author: User
    comments: [Comment]
  }
  extend type Query {
    getPosts: [Post]
    post(id: ID): Post
  }
`;