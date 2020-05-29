import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import Tippy from "@tippyjs/react";

import SEO from "../components/seo";

const shuffle = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

export default function Home(props) {
  const { data } = props;
  const posts = data.allMdx.edges;
  const videos = data.allYoutubeVideo.edges;
  const [shuffled, setShuffled] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setShuffled(shuffle([...posts, ...videos]));
  }, [posts, videos]);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const results = shuffled.filter(({ node }) => {
    if (node.__typename === "Mdx") {
      return node.frontmatter.title
        .toLowerCase()
        .includes(filter.toLowerCase());
    } else if (node.__typename === "YoutubeVideo") {
      return node.title.toLowerCase().includes(filter.toLowerCase());
    }
  });

  return (
    <>
      <SEO
        title="Kurt Kemple's Digital Garden"
        keywords={[
          "blog",
          "gatsby",
          "javascript",
          "react",
          "development",
          "advocacy",
          "mental health",
        ]}
        tags={["development", "advocacy", "mental health"]}
      />
      <h1 className="text-4xl font-thin">Welcome to my digital garden! 🌻</h1>
      <p className="max-w-3xl text-lg mt-0">
        <strong>Hey, I'm Kurt!</strong> I'm very passionate about{" "}
        <a href="https://graphql.org">GraphQL</a>, the{" "}
        <a href="https://jamstack.org">JAMstack</a>, mental health, fitness, and
        investing in community. When not working I can be found longboarding by
        the ocean or talking someone’s ear off about{" "}
        <a href="https://crossfit.com">CrossFit</a>.
      </p>
      <div className="mt-16">
        <input
          className="py-1 px-3 rounded-md mb-6 text-lg w-1/2"
          value={filter}
          type="search"
          onChange={handleSearch}
          placeholder="Looking for something?"
        />
        {results.map(({ node }) => {
          if (node.__typename === "Mdx") {
            const title = node.frontmatter.title;
            return (
              <div key={node.fields.slug} className="mb-3">
                <h4>
                  <Link to={node.fields.slug}>{title}</Link>
                </h4>
              </div>
            );
          } else if (node.__typename === "YoutubeVideo") {
            const title = node.title;
            return (
              <div className="mb-3" key={title}>
                <h4>
                  <Tippy
                    className=".bg-gray-800"
                    theme="light-border"
                    content={
                      <>
                        <h4 className="text-center font-thin">YouTube Video</h4>
                        <img src={node.thumbnails.high.url} />
                      </>
                    }
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${node.resourceId.videoId}`}
                    >
                      {title}
                    </a>
                  </Tippy>
                </h4>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx {
      edges {
        node {
          __typename
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            bloomed
          }
        }
      }
    }
    allYoutubeVideo {
      edges {
        node {
          __typename
          description
          title
          resourceId {
            videoId
          }
          thumbnails {
            high {
              url
            }
          }
        }
      }
    }
  }
`;
