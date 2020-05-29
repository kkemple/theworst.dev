/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: "The Worst Dev",
    author: `Kurt Kemple`,
    description: `Kurt Kemple's Digital Garden - Development, Advocacy, Vidography, Photography, Mental Health, and more`,
    siteUrl: `https://theworst.dev`,
    social: {
      twitter: `kurtkemple`,
      github: `kkemple`,
    },
  },
  plugins: [
    "gatsby-plugin-layout",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },

          {
            resolve: `gatsby-remark-autolink-headers`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
