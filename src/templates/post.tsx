import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FiFile } from "react-icons/fi";

import Bio from "../components/bio";
import SEO from "../components/seo";

function PostTemplate(props) {
  const post = props.data.mdx;
  const related = props.data.related.edges;

  console.log(related);

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        tags={post.frontmatter.tags}
      />
      <div id="post-body">
        <div>
          <h1 className="leading-tight mb-2">{post.frontmatter.title}</h1>
          <div style={{ fontSize: 12, marginBottom: 40 }}>
            {post.frontmatter.bloomed ? (
              <span>
                {"🌻"}
                <span style={{ marginLeft: 2, fontStyle: "italic" }}>
                  This post has fully bloomed and is unlikely to change
                </span>
              </span>
            ) : (
              <span>
                {"🌱"}
                <span style={{ marginLeft: 2, fontStyle: "italic" }}>
                  This post is still growing and likely to be updated
                </span>
              </span>
            )}
          </div>
        </div>
        <MDXRenderer>{post.body}</MDXRenderer>
        <Bio />
      </div>
      {!!related.length && (
        <div className="mt-12">
          <h3>Related Content</h3>
          {related.map(({ node }) => (
            <div
              className="mb-1 flex items-center  hover:bg-dark-bg p-2 rounded"
              key={node.frontmatter.title}
            >
              <span className="mr-2">
                <FiFile />
              </span>
              <h4 className="text-base">
                <Link className="no-gradient" to={node.fields.slug}>
                  {node.frontmatter.title}
                </Link>
              </h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default PostTemplate;

export const query = graphql`
  query($slug: String!, $tags: [String!]!, $id: String!) {
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
    related: allMdx(
      filter: { id: { ne: $id }, frontmatter: { tags: { in: $tags } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
