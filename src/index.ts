import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./data-source";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typedefs";
import { Request } from "express";
import cors = require("cors");
import express = require("express");
const app = express();

app.use("/graphql", cors<Request>());

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
