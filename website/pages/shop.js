import React from "react";
import { gql } from "@apollo/client";

import Head from "next/head";
import styles from "@styles/content.module.css";
import ContentCard from "@components/ContentCard";

import { client } from "@utils/graphql";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Shop({ products }) {
  const title = "Check out The Worst Shop";
  const description = "The best worst shop on the web";
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
        <ul className={styles.content}>
          {products.map((product) => {
            const lowestPrice = Math.min(...product.prices);
            const priceText = `$${lowestPrice.toFixed(2)}`;
            return (
              <ContentCard
                style="outline"
                key={product.id}
                url={`/shop/product/${product.id}`}
                title={product.title}
                image={product.images[0]}
                description={
                  product.prices.length > 1 ? `From ${priceText}` : priceText
                }
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

const LIST_PRODUCTS = gql`
  query ListProducts {
    products {
      id
      title
      description
      prices
      images {
        src
        altText
      }
    }
  }
`;

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: LIST_PRODUCTS,
  });

  return {
    props: {
      products: data.products,
    },
    revalidate: 60 * 60, // regenerate page every hour
  };
};
