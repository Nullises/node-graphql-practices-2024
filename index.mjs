import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sessions = require("./data/sessions.json");

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    sessions: [Session]
  }
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
    level: String
  }
`;

const resolvers = {
  Query: {
    sessions: () => sessions,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
