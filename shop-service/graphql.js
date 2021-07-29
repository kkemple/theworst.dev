import { gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

// create resolvers
const resolvers = {
  Query: {
    products: (_, __, { client }) => client.product.fetchAll(),
    product: async (_, { id }, { client }) => client.product.fetch(id),
  },
  Variant: {
    price: (variant) => Number(variant.price),
  },
  Mutation: {
    createCheckout: async (
      _,
      { checkoutInput: { variantId, quantity } },
      { client }
    ) => {
      const checkout = await client.checkout.create();

      await client.checkout.addLineItems(checkout.id, [
        {
          variantId,
          quantity,
        },
      ]);

      return checkout.webUrl;
    },
  },
};

// federated schema
export const schema = buildFederatedSchema({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
});
