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
          url="/pyramid-of-challenge"
          title="Distributing Challenge: On Building Highly Engaged Teams"
          description="This post is about how unbalanced distribution of challenge across a team can cause productivity to drop. It outlines some of the common team structures you'll encounter and provides a model for how to think about distributing challenge."
        />
        <hr className={`${styles.divider} ${styles.dividerContentCard}`} />
        <h3>Guides</h3>
        <div style={{ marginBottom: "32px" }}>
          <ContentCard
            url="/developer-advocates-guide-to-addressing-product-friction"
            title="The Developer Advocate's Guide to Addressing Product Friction"
            description="Over the last three months, we've been developing a framework at Apollo called DX Audits to help us identify, document, report, and address product friction. It was getting difficult to scale this part of developer advocacy so we came up with a framework and this post covers our experience with it and where we landed on the framework's implementation."
          />
        </div>
        <div style={{ marginBottom: "32px" }}>
          <ContentCard
            url="/developer-advocates-guide-to-getting-buy-in"
            title="The Developer Advocate's Guide to Getting Buy-In"
            description={`Getting buy-in as a developer advocate is a unique challenge. We usually are not the owners or even direct contributors to what we're trying to change. Instead, we represent this bizarre ephemeral thing called a "community." In this post, I'll cover what buy-in is, how it applies to developer advocacy, what skills help the most when trying to get buy-in, and the processes I use.`}
          />
        </div>
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
