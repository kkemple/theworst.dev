import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Bio from "../components/bio";
import SEO from "../components/seo";

function PostTemplate(props) {
  const post = props.data.mdx;

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        tags={post.frontmatter.tags}
      />
      <div id="post-body">
        <div>
          <h1 style={{ marginTop: 48, marginBottom: 8 }}>
            {post.frontmatter.title}
          </h1>
          <div style={{ fontSize: 12, marginBottom: 40 }}>
            {post.frontmatter.bloomed ? (
              <span>
                {"🌸 "}
                <span style={{ marginLeft: 2, fontStyle: "italic" }}>
                  This post has fully bloomed and is unlikely to change
                </span>
              </span>
            ) : (
              <span>
                {"🌱 "}
                <span style={{ fontStyle: "italic" }}>
                  This post is still growing and likely to be updated
                </span>
              </span>
            )}
          </div>
        </div>
        <MDXRenderer>{post.body}</MDXRenderer>
        <Bio />
      </div>
    </>
  );
}

export default PostTemplate;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        bloomed
        tags
      }
      body
      rawBody
    }
  }
`;
