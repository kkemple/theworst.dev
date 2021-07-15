import { gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

// create resolvers
const resolvers = {
  Query: {
    products: async (_, __, { client }) => {
      const products = await client.product.fetchAll();
      return products;
    },
  },
  Product: {
    prices: (product) =>
      product.variants.map((variant) => Number(variant.price)),
  },
};

// federated schema
export const schema = buildFederatedSchema({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
});
