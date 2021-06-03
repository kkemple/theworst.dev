import { gql } from "apollo-server";
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
    products: [Product!]!
  }

  type Product {
    id: ID!
    title: String!
  }
`;

// create resolvers
const resolvers = {
  Query: {
    products: (_, __, { client }) => client.product.fetchAll(),
  },
};

// federated schema
export const schema = buildFederatedSchema({
  typeDefs,
  resolvers,
});
