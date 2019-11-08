import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { RESTDataSource } from 'apollo-datasource-rest';

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  launchReducer(launch: any) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }
}

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  "A response for all mutations"
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  "Definition for Author"
  type Author {
    """
    Description for books field in Author
    """
    books: [Book]
    name: String
  }
  "Definition for Book"
  type Book {
    title: String
    author: String
  }

  type Query {
    getBooks: [Book]
    getAuthors: [Author]
    getAllLaunches: [Launch]
  }
  type Mutation {
    addBook(
      "Description for argument"
      title: String
      author: String
    ): AddBookResponse
  }

  type AddBookResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

// The resolvers
const resolvers = {
  Query: {
    getBooks: () => books,
    getAllLaunches: (_,__,{ dataSources }) => dataSources.launch.getAllLaunches()
  },
  Mutation: { addBook: (_: any, args: any) => {
    return {
      book: args
     }
   }
 }
};

const dataSources = () => {
  return {
    launch: new LaunchAPI()
  }
}

const PORT = 3000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)