require("dotenv").config();

const fetch = require("isomorphic-fetch");
const crypto = require("crypto");
const path = require(`path`);
const ypi = require("youtube-playlist-info");
const { createFilePath } = require(`gatsby-source-filesystem`);

const buildCloudinaryURL = (title, tags) => {
  let tagsURL = "";
  if (tags) {
    const encodedTags = tags
      .map((tag) => `%23${tag.replace(" ", "")}`)
      .join("%20%20");
    tagsURL = `l_text:Teko_48:${encodedTags},g_south_west,x_130,y_85,co_rgb:ffffff/`;
  }

  return `https://res.cloudinary.com/theworstdev/image/upload/${tagsURL}l_text:Teko_96_bold_line_spacing_-30:${title},co_rgb:ffffff,c_fit,g_south_west,w_900,x_130,y_280/v1587829683/twd_wq5r4k.png`;
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/post.tsx`);
  return graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      const { title, tags } = post.node.frontmatter;

      // make sure we cache the new social card in Cloudinary
      // HACK THE PLANET!!!
      fetch(buildCloudinaryURL(title, tags));

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });
  });
};

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  let quickTipsNode = {
    id: "quickTipsPlaylist",
    parent: "youtubePlaylists",
    children: [],
    internal: {
      type: "YoutubePlaylist",
    },
  };

  const makeNode = (node) => {
    node.internal.contentDigest = crypto
      .createHash("md5")
      .update(JSON.stringify(node))
      .digest("hex");

    createNode(node);
  };

  const playlist = "PLIdaz4KCHMlcH0VLrr1UTGLIIdEneheki";

  const videos = await ypi(process.env.YOUTUBE_API_KEY, playlist);

  quickTipsNode.children = videos.map((video) => {
    const id = `youtubeVideo-${video.resourceId.videoId}`;
    makeNode({
      id,
      title: video.title,
      description: video.description,
      thumbnails: video.thumbnails,
      position: video.position,
      resourceId: video.resourceId,
      internal: {
        type: "YoutubeVideo",
      },
      parent: "quickTipsPlaylist",
      children: [],
    });
    return id;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
