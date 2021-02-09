import "typeface-inter";
import "@styles/globals.css";
import "@styles/code-theme.css";

import withDarkMode from "next-dark-mode";
import Layout from "@components/Layout";

function Application({ Component, pageProps, darkMode }) {
  const { darkModeActive } = darkMode;
  return (
    <Layout darkModeActive={darkModeActive} {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withDarkMode(Application);
