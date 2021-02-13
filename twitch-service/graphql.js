const fs = require("fs");
const { gql } = require("apollo-server");

const CHAT_MESSAGE = "CHAT_MESSAGE";
const BAN = "BAN";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const createResolvers = (pubsub) => {
  return {
    Query: {
      hello: () => "hi",
    },
  };
};

module.exports = {
  typeDefs: gql`
    ${typeDefs}
  `,
  createResolvers,
};
