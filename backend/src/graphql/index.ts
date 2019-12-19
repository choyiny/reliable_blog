import * as asdf from './schema';
import { merge } from 'lodash';
import { ApolloServer } from 'apollo-server-express';

console.log(asdf);
let resolvers = {} as any;
let typeDefs = [
  `
    type Query {
      _: Boolean
    }
  `
] as any;
for (let name in asdf) {
  if (name.includes('Type')) {
    typeDefs.push(asdf[name]);
  }
  if (name.includes('Resolver')) {
    merge(resolvers, asdf[name]);
  }
}
export const server = new ApolloServer({
  typeDefs,
  resolvers
  // typeDefs: [DateType, Post, User, Comment],
  // resolvers: merge(PostResolver, UserResolver),
});