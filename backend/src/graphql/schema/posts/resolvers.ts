import { Post } from '../../../db'
import { mapAttributes } from '../../../utils';
export const resolvers = {
  Query: {
    getPosts: async (_, args, context, info) => {
      // return Post.findAll({attributes: mapAttributes(Post, info)});
      return Post.findAll()
    },
    post: async (_, args, context, info) => {
      return Post.findOne({where: args});
    },
  },
  Post: {
    author: async (post) => {
      return post.getAuthor();
    },
    comments: async (post) => {
      return post.getComments();
    }
  }
}