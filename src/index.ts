import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
import { AppDataSource } from "./data-source";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to the database.");
    return await startStandaloneServer(server, {
      listen: { port: 5000 },
    });
  })
  .then((res) => {
    console.log("Server listening on port", res.url); 
  })
  .catch((error) => console.log(error));
