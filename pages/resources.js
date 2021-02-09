import ProfilePics from "@components/ProfilePics";
import Bio from "@components/Bio";
import Link from "next/link";
import Head from "next/head";

import styles from "./resources.module.css";

export default function Resources() {
  const title = "Headshots, bios, and links to things in my eco-system.";
  const description =
    "Your one stop shop for all things needed for me to appear as a guest on your stream/podcast/conf/etc";

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
        <main className={styles.container}>
          <h2>Speaker Kit</h2>
          <p>
            Here are some headshot and bio options, if these don't fit your
            needs please{" "}
            <a href="https://twitter.com/theworstdev">
              reach out to me on Twitter!
            </a>
          </p>
          <div className={styles.speakerKit}>
            <ProfilePics />
            <Bio />
          </div>
          <hr className={styles.divider} />
          <h2>Links</h2>
          <ul className={styles.links}>
            <li>
              <Link href="https://theworst.dev/discord">
                <a>Join Me On Discord</a>
              </Link>
            </li>
            <li>
              <Link href="https://theworst.dev/coffee">
                <a>Schedule a Chat</a>
              </Link>
            </li>
            <li>
              <Link href="https://twitch.tv/theworstdev">
                <a>The Worst Dev Stream</a>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/fad_dnd">
                <a>Functions & Dragons - D&D Stream</a>
              </Link>
            </li>
            <li>
              <Link href="https://twitch.tv/apollographql">
                <a>Apollo GraphQL Stream</a>
              </Link>
            </li>
            <li>
              <Link href="https://partycorgi.com">
                <a>Party Corgi Network</a>
              </Link>
            </li>
            <li>
              <Link href="/coc">
                <a>Code of Conduct</a>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
