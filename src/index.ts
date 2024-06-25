import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./data-source";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typedefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to the database.");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log("Server listening on port", res.port);
  })
  .catch((error) => console.log(error));
