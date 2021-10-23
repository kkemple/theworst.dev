import Link from "next/link";
import { YouTube, SoundCloud } from "mdx-embed";
import styles from "@styles/index.module.css";
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
          <Link href="https://www.buymeacoffee.com/catcarbn">
            <a title="Avatar by @catcarbn, https://www.buymeacoffee.com/catcarbn">
              <img
                className={styles.avatar}
                src="/avatar-small.png"
                alt="Illustrated avatar by @catcarbn on Twitter"
              />
            </a>
          </Link>
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
          url="/developer-advocates-guide-to-addressing-product-friction"
          title="The Developer Advocate's Guide to Addressing Product Friction"
          description="Over the last three months, we've been developing a framework at Apollo called DX Audits to help us identify, document, report, and address product friction. Our team and company is growing quickly and it was becoming increasingly difficult to address product friction. We wanted a framework that would help us make that part of developer advocacy more repeatable, teachable, and reportable."
        />
        <hr className={`${styles.divider} ${styles.dividerContentCard}`} />
        <h3>Some of my recent appearances</h3>
        <div className={styles.appearances}>
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
        </div>
      </main>
    </div>
  );
}
