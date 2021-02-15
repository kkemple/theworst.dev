import Head from "next/head";
import Billboard from "@components/Billboard";
import styles from "./BlogPost.module.css";
import { buildCloudinaryURL } from "@utils/cloudinary";
import { useQuery, gql } from "@apollo/client";

const POST_QUERY = gql`
  query Post($slug: String!) @_live(events: [POST_LIKE]) {
    post(slug: $slug) {
      id
      count
    }
  }
`;

export default function BlogPost({ meta, children }) {
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { slug: global.location?.pathname },
  });

  console.log({ data, loading, error });
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="og:title" content={meta.title} />
        <meta name="og:description" content={meta.description} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content={`${buildCloudinaryURL(meta.title)}`} />
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
