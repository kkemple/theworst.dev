import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

// create typedefs
const typeDefs = gql`
  enum PublishableEvent {
    FOLLOW
    SUBSCRIBE
    RAID
    BAN
    CHAT_MESSAGE
    CHANNEL_UPDATED
    POST_UPDATED
  }

  directive @_publish(event: PublishableEvent!) on FIELD_DEFINITION

  directive @_live(events: [PublishableEvent!]!) on QUERY

  extend type Query {
    hello: String!
  }
`;

// create resolvers
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

// federated schema
const schema = buildFederatedSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  subscriptions: false,
});

server.listen(6767).then(({ url }) => {
  console.log(`💸 Listening on ${url}`);
});
