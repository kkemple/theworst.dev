import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./content.module.css";

export default function Garden({ posts }) {
  const [filter, setFilter] = useState("");

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const results = posts.filter((post) => {
    return post.title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
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
          <div className={styles.postCard}>
            <Link key={post.slug} href={post.slug}>
              <a className={styles.link}>
                <h5>{post.title}</h5>
                <p>{post.description}</p>
              </a>
            </Link>
          </div>
        ))}
      </main>
    </div>
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

  function importAll(r) {
    return r.keys().map((fileName) => ({
      link: fileName.substr(1).replace(/\/index\.mdx$/, ""),
      module: r(fileName),
    }));
  }

  const postsData = importAll(require.context(".", true, /\.mdx$/));
  const posts = shuffle(
    postsData.map((postData) => {
      return {
        title: postData.module.meta.title,
        slug: postData.link.replace(".mdx", ""),
        description: postData.module.meta?.description,
      };
    })
  );

  return {
    props: {
      posts: posts.filter((post) => post.title !== "Code of Conduct"),
    },
  };
}
