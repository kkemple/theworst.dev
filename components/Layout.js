import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Layout({ darkModeActive, children }) {
  const title = "The Worst Dev - Hey, I'm Kurt!";
  const description =
    "Formerly incarcerated developer, content creator, and developer experience consultant.";

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
        <meta
          name="og:image"
          content={`${buildCloudinaryURL(
            "Pushing developer experience forward."
          )}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@theworstdev" />
        <meta name="twitter:title" content={"Hey, I'm Kurt!"} />
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