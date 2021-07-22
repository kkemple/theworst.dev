import { gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

// create resolvers
const resolvers = {
  Query: {
    products: (_, __, { client }) => client.product.fetchAll(),
    product: async (_, { id }, { client }) => {
      const product = await client.product.fetch(id);

      console.log(product);

      return product;
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
