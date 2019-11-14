import { Post } from '../../../db'
export const resolvers = {
  Query: {
    getPosts: async () => {
      return Post.findAll();
    },
    post: async (_, args, context, info) => {
      return Post.findOne({where: args});
    },
  },
  Post: {
    author: async (post) => {
      return post.getAuthor();
    }
  }
}