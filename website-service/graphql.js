const fs = require("fs");
const { gql } = require("apollo-server");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    likeCountForPost: () => 0,
    likesForPost: () => [],
    recentLikes: () => [],
  },
  Mutation: {
    likePost: (_, { slug, count }) => {
      console.log({ slug, count });
      return {
        id: "test-id",
        slug,
        count,
      };
    },
  },
};

module.exports = {
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
};
