import "typeface-inter";
import "@styles/globals.css";
import "@styles/code-theme.css";

import withDarkMode from "next-dark-mode";
import Layout from "@components/Layout";
import { useEffect } from "react";

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
    <Layout darkModeActive={darkModeActive} {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withDarkMode(Application);
