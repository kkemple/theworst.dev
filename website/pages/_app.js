import "typeface-inter";
import "@styles/globals.css";
import "@styles/code-theme.css";

import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import withDarkMode from "next-dark-mode";
import Layout from "@components/Layout";
import { client } from "@utils/graphql";

function Application({ Component, pageProps, darkMode }) {
  const { darkModeActive } = darkMode;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js", { scope: "." })
        .then((reg) => {
          // registration worked
          console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch((error) => {
          // registration failed
          console.log("Registration failed with " + error);
        });
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Layout darkModeActive={darkModeActive} {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default withDarkMode(Application);
