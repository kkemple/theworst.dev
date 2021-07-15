const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

/* Apollo */

const config =
  process.env.NODE_ENV === "production"
    ? {}
    : {
        serviceList: [
          { name: "twitch", url: "https://twd-twitch-service.fly.dev/graphql" },
          { name: "website", url: "https://twd-website-service.fly.dev/" },
          { name: "shop", url: "http://localhost:6767" },
        ],
      };

const gateway = new ApolloGateway(config);

const server = new ApolloServer({ gateway, subscriptions: false });

server.listen(6969).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});
