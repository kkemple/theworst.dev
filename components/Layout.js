import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Layout({ darkModeActive, children }) {
  const title = "Digital Vandal - A real riot";
  const description =
    "Formerly incarcerated tech leader, engineer, teacher, and developer experience specialist.";

  return (
    <div className={`${darkModeActive && "dark"} app`}>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="twitter:creator" content="@_digitalvandal" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="prefetch" href="/hidden-leaf-village-day.gif" />
        <link rel="prefetch" href="/hidden-leaf-village-night.gif" />
      </Head>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
