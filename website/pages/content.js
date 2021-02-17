import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useState } from "react";
import Head from "next/head";
import ContentCard from "@components/ContentCard";
import { buildCloudinaryURL } from "@utils/cloudinary";
import { postFilePaths, POSTS_PATH } from "@utils/mdx";
import styles from "./content.module.css";

export default function Garden({ posts }) {
  const title = "Kurt Kemple's Digital Garden";
  const description =
    "This is where I write about about everything software sevelopment, developer relations, mental health, and more. I hope you find something that relates to you!";

  const [filter, setFilter] = useState("");

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const results = posts.filter((post) => {
    return post.title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content={`${buildCloudinaryURL(title)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@theworstdev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div>
        <main className={styles.container}>
          <div className={styles.search}>
            <input
              className={styles.filter}
              value={filter}
              type="text"
              onChange={handleSearch}
              placeholder="Looking for something?"
            />
          </div>
          <hr className={styles.divider} />
          {results.map((post) => (
            <div key={post.slug} className={styles.card}>
              <ContentCard
                key={post.slug}
                url={post.slug}
                title={post.title}
                description={post.description}
              />
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const shuffle = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  const postsData = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  const posts = shuffle(
    postsData.map((post) => {
      return {
        title: post.data.title,
        slug: post.filePath.replace(/\.mdx?$/, ""),
        description: post.data.description,
      };
    })
  );

  return {
    props: {
      posts: posts.filter((post) => post.title !== "Code of Conduct"),
    },
  };
}
