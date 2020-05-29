import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

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

function SEO({ description, lang, meta, keywords, title, tags }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description;

        return (
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={metaDescription} />
            <meta name="og:type" content="website" />
            <meta
              name="og:image"
              content={`${buildCloudinaryURL(title, tags)}`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.author}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
          </Helmet>
        );
      }}
    />
  );
}

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        author
      }
    }
  }
`;
