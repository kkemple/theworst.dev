const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

/* Apollo */

const gateway = new ApolloGateway();
const server = new ApolloServer({ gateway, subscriptions: false });

server.listen(6969).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});
