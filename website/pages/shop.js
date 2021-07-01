import React from "react";
import { gql } from "@apollo/client";

import Head from "next/head";

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
      <div>
        <h1>Shop</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
            </li>
          ))}
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
