import React, { useState } from "react";
import { gql } from "@apollo/client";
import { Markup } from "interweave";

import Head from "next/head";
import styles from "@styles/product.module.css";

import { client } from "@utils/graphql";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Shop({ product }) {
  const title = "Check out The Worst Shop";
  const description = "The best worst shop on the web";

  const [imageIndex, setImageIndex] = useState(0);

  console.log(product.descriptionHtml);

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
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.images[imageIndex].src} />
          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button key={image.id} onClick={() => setImageIndex(index)}>
                  <img src={image.src} alt={image.altText} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={styles.metadata}>
          <h1>{product.title}</h1>
          <Markup content={product.descriptionHtml} />
        </div>
      </div>
    </>
  );
}

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      descriptionHtml
      prices
      images {
        id
        src
        altText
      }
    }
  }
`;

const GET_PRODUCT_IDS = gql`
  query GetProductIDs {
    products {
      id
    }
  }
`;

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_PRODUCT_IDS,
  });

  const paths = data.products
    // Remove file extensions for page paths
    .map((product) => ({ params: { id: product.id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      id,
    },
  });

  return {
    props: {
      product: data.product,
    },
    revalidate: 60 * 60, // regenerate page every hour
  };
};
