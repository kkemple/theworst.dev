import Head from "next/head";
import Billboard from "@components/Billboard";
import styles from "./BlogPost.module.css";

const buildCloudinaryURL = (title, tags) => {
  let tagsURL = "";
  if (tags) {
    const encodedTags = tags
      .map((tag) => `%23${tag.replace(" ", "")}`)
      .join("%20%20");
    tagsURL = `l_text:Teko_48:${encodedTags},g_south_west,x_130,y_85,co_rgb:ffffff/`;
  }

  const url = `https://res.cloudinary.com/theworstdev/image/upload/${tagsURL}l_text:Teko_96_bold_line_spacing_-30:${title},co_rgb:ffffff,c_fit,g_south_west,w_900,x_130,y_280/v1587829683/twd_wq5r4k.png`;

  fetch(url);

  return url;
};

export default function BlogPost({ meta, children }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="og:title" content={meta.title} />
        <meta name="og:description" content={meta.description} />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content={`${buildCloudinaryURL(meta.title, meta.tags)}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@theworstdev" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <Billboard title={meta.title} />
      <article className={styles.post}>{children}</article>
    </>
  );
}
