const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const Pusher = require("pusher");

const { typeDefs, resolvers } = require("./graphql");
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
});

// start up the server
server.listen(4001, async () => {
  console.log(`Server is now running on http://localhost:4001`);
});
