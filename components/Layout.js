import Head from "next/head";
import Header from "@components/Header";
import MusicButton from "@components/MusicButton";
import Footer from "./Footer";

export default function Layout({ darkModeActive, children }) {
  return (
    <div className={`${darkModeActive && "dark"} app`}>
      <Head>
        <title>The Worst Dev | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="content">{children}</div>
      <MusicButton />
      <Footer />
    </div>
  );
}
