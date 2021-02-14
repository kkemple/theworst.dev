import Link from "next/link";
import { YouTube, SoundCloud } from "mdx-embed";
import styles from "./index.module.css";
import SocialIcons from "@components/SocialIcons";
import ContentCard from "@components/ContentCard";

export default function Home() {
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.introContent}>
            <h1 className={styles.callout}>Hey, I'm Kurt.</h1>
            <h4 className={styles.bio}>
              developer, content creator, devrel manager & formerly incarcerated
            </h4>
            <div className={styles.socials}>
              <SocialIcons />
            </div>
          </div>
          <img
            src="/avatar-small.png"
            alt="Illustrated avatar by @catcarbn on Twitter"
          />
        </div>
        <p className={styles.blurb}>
          Thanks for dropping by! Here's a little bit about what kind of content
          you can expect from me. I care deeply about{" "}
          <Link href="https://www.themarshallproject.org/">prison reform</Link>{" "}
          and helping the formerly incarcerated. I also talk about{" "}
          <Link href="https://fullstack.health/">mental health</Link>, drug
          addiction, and neurodiversity. Oh, and once in awhile I write about
          developer advocacy and software development!
        </p>
        <hr className={styles.indexDivider} />
        <h3>If you only read one post, you should read this one</h3>
        <ContentCard
          url="/im-an-impostor"
          title="I'm an Impostor - Incarceration and Living a Lie"
          description="Every day, I walk around telling little lies so I can project
          this false image of myself. I would like to tell you this is a
          story about how I feel like I don't know enough, and then I
          realized that people don't know shit either, but this isn't that
          story."
        />
        <hr className={styles.divider} />
        <h3>Some of my recent appearances</h3>
        <div className={`${styles.postCard} ${styles.no_hover}`}>
          <h5>#AntiracistEconomist Podcast</h5>
          <Link href="https://hashtagcauseascene.com/podcast/kurt-kemple/">
            <a>
              <img
                width="100%"
                src="/guiding-principles.jpg"
                alt="Tech is Not Neutral, Nor is it Apolitical
                      Intention without Strategy is Chaos
                      Lack of Inclusion is a Risk/Crisis Management Issue
                      ….and lastly and most importantly
                      Prioritize the Most Vulnerable"
              />
            </a>
          </Link>
        </div>
        <div className={`${styles.postCard} ${styles.no_hover}`}>
          <h5>Learn with Jason x freeCodeCamp Interview</h5>
          <YouTube youTubeId="4fq8QlpEMec" />
        </div>
        <div className={`${styles.postCard} ${styles.no_hover}`}>
          <h5>Landing in Tech Podcast</h5>
          <SoundCloud soundCloudLink="tracks/948787954" color="f272ad" />
        </div>
      </main>
    </div>
  );
}
