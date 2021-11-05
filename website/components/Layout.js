import Head from "next/head";
import Header from "@components/Header";
import MusicButton from "@components/MusicButton";
import Footer from "@components/Footer";
import ClientOnly from "@components/ClientOnly";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Layout({ darkModeActive, children }) {
  const title = "The Worst Dev - Hey, I'm Kurt!";
  const description =
    "Formerly incarcerated developer, content creator, and developer advocate.";

  return (
    <div className={`${darkModeActive && "dark"} app`}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content={`${buildCloudinaryURL(
            "One day I'm going to be Hokage! You better believe it!"
          )}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@theworstdev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="prefetch" href="/hidden-leaf-village-day.gif" />
        <link rel="prefetch" href="/hidden-leaf-village-night.gif" />
      </Head>
      <Header />
      <div className="content">{children}</div>
      <ClientOnly>
        <MusicButton />
      </ClientOnly>
      <Footer />
    </div>
  );
}
