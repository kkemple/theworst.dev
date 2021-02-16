const express = require("express");
const {
  ApolloServer,
  SchemaDirectiveVisitor,
} = require("apollo-server-express");
const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const { buildFederatedSchema } = require("@apollo/federation");
const Pusher = require("pusher");

const { typeDefs, resolvers } = require("./graphql");
const { createChatClient } = require("./chat");
const { createWebhooks } = require("./webhooks");
const PublishDirective = require("./PublishDirective");

// build the federated schema
const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

// load the custom publish directive for realtime data
const directives = { _publish: PublishDirective };
SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

// set up pusher for realtime events
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// create the Apollo server and disable subscriptions
const server = new ApolloServer({
  schema,
  context: { pusher },
  subscriptions: false,
  plugins: [ApolloServerPluginInlineTrace()],
});

// we need access to the server to add routes for twitch webhooks
const app = express();
server.applyMiddleware({ app });

// set up tmi.js and register events
createChatClient(pusher);

// set up twitch webhooks for events we can't capture in tmi.js
createWebhooks(app, pusher);

// start up the server
app.listen(4000, async () => {
  console.log(`Server is now running on http://localhost:4000`);
});
