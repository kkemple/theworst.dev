import fs from "fs";
import path from "path";
import { getHeadings, postFilePaths, POSTS_PATH } from "@utils/mdx";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import rehypePrism from "@mapbox/rehype-prism";
import remarkSlug from "remark-slug";
import remarkAutoLinkHeadings from "remark-autolink-headings";

import Head from "next/head";
import { Tweet, YouTube } from "mdx-embed";
import styles from "@styles/BlogPost.module.css";
import { buildCloudinaryURL } from "@utils/cloudinary";

const components = {
  Tweet,
  YouTube,
};

export default function BlogPost({ source, frontMatter }) {
  const content = hydrate(source, { components });
  const cloudinaryUrl = buildCloudinaryURL(frontMatter.title);

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
        <meta name="og:title" content={frontMatter.title} />
        <meta name="og:description" content={frontMatter.description} />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content={`${
            frontMatter.ogImage ? frontMatter.ogImage : cloudinaryUrl
          }`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@theworstdev" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
      </Head>
      {/* <Billboard title={frontMatter.title} /> */}

      <article className={styles.post}>
        <>
          <h1 className={`gradient gradient-text`}>{frontMatter.title}</h1>
          {content}
        </>
      </article>
      {/* <div className={styles.likeButton}>
        <ClientOnly>
          <PostLikes />
        </ClientOnly>
      </div> */}
      <hr className={styles.pageDivider} />
      {/* <div className={styles.newsletter}>
        <h2>Don't Miss Out</h2>
        <p>
          Thanks for reading <strong>"{frontMatter.title}"</strong>! Be sure to
          sign up for my newsletter to be the first to receive my newest
          content, interesting things I discover, and get actionable insights
          right to your inbox!
        </p>
        <ConvertKit formId={2021531} />
      </div> */}
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const headings = await getHeadings(content);

  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        [remarkAutoLinkHeadings, { behavior: "wrap" }],
      ],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headings,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
