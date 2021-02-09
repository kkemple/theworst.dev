import Link from "next/link";
import styles from "./index.module.css";
import SocialIcons from "@components/SocialIcons";

export default function Home() {
  return (
    <div>
      <main className={styles.container}>
        <h1 className={styles.callout}>Hey, I'm Kurt.</h1>
        <h4 className={styles.bio}>
          developer, content creator, devrel manager & formerly incarcerated
        </h4>
        <div className={styles.socials}>
          <SocialIcons />
        </div>
        <p className={styles.blurb}>
          Thanks for dropping by! Here's a little bit about what kind of content
          you can expect from me. I care deeply about{" "}
          <Link href="">prison reform</Link> and helping the formerly
          incarcerated. I also talk about <Link href="">mental health</Link>,
          drug addiction, and neurodiversity. Oh, and once in awhile I write
          about developer advocacy and software development!
        </p>
        <hr className={styles.indexDivider} />
        <h3>If you only read one post, you should read this one</h3>
        <div className={styles.postCard}>
          <Link href="im-an-impostor">
            <a>
              <h5>I'm an Impostor - Incarceration and Living a Lie</h5>
              <p>
                Every day, I walk around telling little lies so I can project
                this false image of myself. I would like to tell you this is a
                story about how I feel like I don't know enough, and then I
                realized that people don't know shit either, but this isn't that
                story.
              </p>
            </a>
          </Link>
        </div>
        <hr className={styles.divider} />
        <h3>Some of my recent appearances</h3>
        <div className={`${styles.postCard} ${styles.no_hover}`}>
          <h5>Learn with Jason x freeCodeCamp Interview</h5>
          <iframe
            className={styles.iframe}
            src="https://www.youtube.com/embed/4fq8QlpEMec"
            allowfullscreen
          ></iframe>
        </div>
        <div className={`${styles.postCard} ${styles.no_hover}`}>
          <h5>Landing in Tech Podcast</h5>
          <iframe
            className={styles.iframe}
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/948787954&color=%23243c44&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
