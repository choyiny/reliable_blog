import * as express from 'express';
import * as bodyParser from 'body-parser';
import { server } from './graphql'

const PORT = 3000;

const app = express();

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)