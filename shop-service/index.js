import { ApolloServer } from "apollo-server";
import Client from "shopify-buy";
import { schema } from "./graphql";

const client = Client.buildClient({
  domain: process.env.DOMAIN,
  storefrontAccessToken: process.env.STOREFRONT_ACCESS_TOKEN,
});

const server = new ApolloServer({
  schema,
  subscriptions: false,
  context: () => ({ client }),
});

server.listen(6767).then(({ url }) => {
  console.log(`💸 Listening on ${url}`);
});
