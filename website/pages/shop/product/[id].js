import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Markup } from "interweave";

import Head from "next/head";
import styles from "@styles/product.module.css";

import { client } from "@utils/graphql";
import { buildCloudinaryURL } from "@utils/cloudinary";

const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($checkoutInput: CheckoutInput!) {
    createCheckout(checkoutInput: $checkoutInput)
  }
`;

export default function Shop({ product }) {
  const title = "Check out The Worst Shop";
  const description = "The best worst shop on the web";

  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const [createCheckout, { loading, error }] = useMutation(CREATE_CHECKOUT, {
    onCompleted: (data) => {
      window.location.href = data.createCheckout;
    },
    variables: {
      checkoutInput: {
        quantity,
        variantId: selectedVariant.id,
      },
    },
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
          <h3>{`$${selectedVariant.price.toFixed(2)}`}</h3>
          <div>
            {product.variants.length > 1 && (
              <select
                value={selectedVariant.id}
                onChange={(event) =>
                  setSelectedVariant(
                    product.variants.find(
                      (variant) => variant.id === event.target.value
                    )
                  )
                }
              >
                {product.variants.map((variant) => (
                  <option
                    key={variant.id}
                    value={variant.id}
                    disabled={!variant.available}
                  >
                    {variant.title}
                  </option>
                ))}
              </select>
            )}
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.valueAsNumber)}
              onBlur={(event) => {
                const { valueAsNumber } = event.target;
                if (valueAsNumber % 1) {
                  setQuantity(Math.floor(valueAsNumber));
                }
              }}
            />
          </div>
          <Markup content={product.descriptionHtml} />
          {/* TODO: style these */}
          {error && <div>{error.message}</div>}
          <button disabled={loading} onClick={createCheckout}>
            Buy now
          </button>
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
      variants {
        id
        title
        price
        available
      }
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
