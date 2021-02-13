const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
