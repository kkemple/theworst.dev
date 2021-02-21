import Head from "next/head";
import Header from "@components/Header";
import MusicButton from "@components/MusicButton";
import Footer from "./Footer";
import { buildCloudinaryURL } from "@utils/cloudinary";

export default function Layout({ darkModeActive, children }) {
  const title = "The Worst Dev - personal brand for Kurt Kemple";
  const description =
    "Thanks for dropping by! Here's a little bit about what kind of content you can expect from me. I care deeply about prison reform and helping the formerly incarcerated. I also talk about mental health, drug addiction, and neurodiversity. Oh, and once in awhile I write about developer advocacy and software development!";

  return (
    <div className={`${darkModeActive && "dark"} app`}>
      <Head>
        <title>The Worst Dev</title>
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
      <MusicButton />
      <Footer />
    </div>
  );
}
