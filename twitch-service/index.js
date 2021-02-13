const express = require("express");
const {
  ApolloServer,
  SchemaDirectiveVisitor,
} = require("apollo-server-express");
const { buildFederatedSchema } = require("@apollo/federation");
const { createServer } = require("http");

const { typeDefs, createResolvers } = require("./graphql");
const { createChatClient } = require("./chat");
const { createWebhooks } = require("./webhooks");
const PublishDirective = require("./PublishDirective");

const PORT = 4000;

async function main() {
  const app = express();
  const resolvers = createResolvers();

  const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
  const directives = { _publish: PublishDirective };
  SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

  const server = new ApolloServer({
    schema,
    subscriptions: false,
  });
  server.applyMiddleware({ app });

  createChatClient();
  // createWebhooks(app);

  const ws = createServer(app);
  ws.listen(PORT, async () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
}

main();
