const fs = require("fs");
const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    raids: () => [],
    bans: () => [],
    chatMessages: () => [],
    follows: () => [],
    subs: () => [],
    channel: async () => {
      const { data: userData } = await axios.get(
        `https://api.twitch.tv/helix/users?login=${process.env.CHANNEL}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      const { data: channelData } = await axios.get(
        `https://api.twitch.tv/v5/channels/${userData.data[0].id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      const { data: streamData } = await axios.get(
        `https://api.twitch.tv/helix/streams?user_id=${userData.data[0].id}&first=1`,
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      const latestStream = streamData.data[0];

      return {
        id: parseInt(channelData._id, 10),
        name: channelData.name,
        title: channelData.status,
        category: channelData.game,
        views: channelData.views,
        followers: channelData.followers,
        isLive: latestStream?.type === "live",
        viewerCount: latestStream?.viewer_count,
        streamStartedAt: latestStream?.started_at,
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
