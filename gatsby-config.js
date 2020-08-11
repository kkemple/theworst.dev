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
    `gatsby-plugin-sharp`,
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
              maxWidth: 768,
              // linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "no-gradient",
              icon: `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Worst Dev`,
        short_name: `The Worst Dev`,
        start_url: `/`,
        background_color: `#0f1e2f`,
        theme_color: `#0f1e2f`,
        display: `minimal-ui`,
        icon: `static/favicon.ico`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
