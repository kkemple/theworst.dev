import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import Tippy from "@tippyjs/react";
import { FiYoutube, FiFile } from "react-icons/fi";

import SEO from "../components/seo";

const shuffle = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const CurationGroup = ({ title, nodes }) => (
  <div className="curation-group-container w-1/2 m-3">
    <div className="curation-group p-3">
      <h3 className="font-light">{title}</h3>
      <ul className="curation-list mt-2">
        {nodes.map(({ node }) => renderNode(node))}
      </ul>
    </div>
  </div>
);

const renderNode = (node) => {
  if (node.__typename === "Mdx") {
    const title = node.frontmatter.title;
    return (
      <div
        className="mb-3 flex items-center  hover:bg-dark-bg p-2 rounded"
        key={title}
      >
        <span className="mr-2">
          <FiFile />
        </span>
        <h4 className="text-base">
          <Link className="no-gradient" to={node.fields.slug}>
            {title}
          </Link>
        </h4>
      </div>
    );
  } else if (node.__typename === "YoutubeVideo") {
    const title = node.title;
    return (
      <div
        className="mb-3 flex items-center  hover:bg-dark-bg p-2 rounded"
        key={title}
      >
        <span className="mr-2">
          <FiYoutube />
        </span>
        <h4 className="text-base">
          <Tippy
            theme="light-border"
            arrow={false}
            content={
              <>
                <img style={{ width: 200 }} src={node.thumbnails.high.url} />
              </>
            }
          >
            <a
              className="no-gradient"
              href={`https://www.youtube.com/watch?v=${node.resourceId.videoId}`}
            >
              {title}
            </a>
          </Tippy>
        </h4>
      </div>
    );
  }
};

export default function Home(props) {
  const { data } = props;
  const posts = data.allMdx.edges;
  const videos = data.allYoutubeVideo.edges;
  const livestreamingPosts = data.curatedLivestreamMdx.edges;
  const mentalHealthPosts = data.curatedMentalHealthMdx.edges;
  const livestreamingVideos = data.curatedLivestreamVideos.edges;
  const [shuffled, setShuffled] = useState([]);
  const [filter, setFilter] = useState("");

  console.log({
    livestreamingPosts,
    livestreamingVideos,
    mentalHealthPosts,
  });

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
      <h1 className="text-4xl font-thin leading-tight mb-2">
        Welcome to my digital garden! 🌻
      </h1>
      <p className="max-w-2xl text-xl mt-0">
        <strong>Hey, I'm Kurt!</strong> I'm very passionate about{" "}
        <a href="https://graphql.org">GraphQL</a>, the{" "}
        <a href="https://jamstack.org">JAMstack</a>, livestreaming, mental
        health, fitness, and investing in community.
      </p>
      <hr className="mb-16" />
      <div>
        <h2 className="font-thin mb-0">Kurt's Curations</h2>
        <p className="max-w-xl mt-1">
          These curated groups of posts are hand selected to give you quick
          access to some common topics. 100% organic, non-GMO. 👨‍🌾
        </p>
        <div className="flex -mx-2">
          <CurationGroup
            title="Livestreaming"
            nodes={[...livestreamingPosts, ...livestreamingVideos]}
          />
          <CurationGroup title="Mental Health" nodes={mentalHealthPosts} />
        </div>
      </div>
      <div className="mt-16">
        <input
          className="py-1 px-3 rounded-md mb-6 text-lg w-full"
          value={filter}
          type="text"
          onChange={handleSearch}
          placeholder="Looking for something?"
        />
        {results.map(({ node }) => renderNode(node))}
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
    curatedLivestreamMdx: allMdx(
      filter: { frontmatter: { curationGroup: { eq: "livestreaming" } } }
    ) {
      edges {
        node {
          __typename
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    curatedLivestreamVideos: allYoutubeVideo(
      filter: { curationGroup: { eq: "livestreaming" } }
    ) {
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
    curatedMentalHealthMdx: allMdx(
      filter: { frontmatter: { curationGroup: { eq: "mental health" } } }
    ) {
      edges {
        node {
          __typename
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
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
