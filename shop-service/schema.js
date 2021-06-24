import { gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

// create resolvers
const resolvers = {
  Query: {
    products: (_, __, { client }) => client.product.fetchAll(),
  },
};

// federated schema
export const schema = buildFederatedSchema({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
});
