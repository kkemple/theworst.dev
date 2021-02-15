const fs = require("fs");
const { gql } = require("apollo-server");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    post: async (_, { slug }, { prisma }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
      });

      return post;
    },
    topPosts: async (_, __, { prisma }) => {
      const posts = await prisma.post.findMany({
        take: 5,
        orderBy: [
          {
            count: "desc",
          },
        ],
      });

      return posts;
    },
    likes: async (_, __, { prisma }) => {
      const likes = await prisma.like.findMany({
        take: 20,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      return likes;
    },
  },
  Mutation: {
    likePost: async (_, { slug, count }, { prisma }) => {
      const post = await prisma.post.findUnique({
        where: { slug },
      });

      if (!post) {
        return prisma.post.create({
          data: { slug, count, likes: { create: [{ slug, count }] } },
        });
      } else {
        return prisma.post.update({
          where: { slug },
          data: {
            count: post.count + count,
            likes: { create: [{ slug, count }] },
          },
        });
      }
    },
  },
  Post: {
    likes: async ({ slug }, _, { prisma }) => {
      const likes = await prisma.like.findMany({
        where: { slug },
        take: 20,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      return likes;
    },
  },
  Like: {
    post: async ({ slug }, _, { prisma }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
      });

      return post;
    },
  },
};

module.exports = {
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
};
