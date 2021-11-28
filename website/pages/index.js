import Link from "next/link";
import { YouTube } from "mdx-embed";
import styles from "@styles/index.module.css";
import SocialIcons from "@components/SocialIcons";
import ContentCard from "@components/ContentCard";

export default function Home() {
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.introContent}>
            <h1 className={`${styles.callout} gradient gradient-text`}>
              Hey, I'm Kurt.
            </h1>
            <p className={styles.bio}>
              I'm a{" "}
              <strong>
                <span className="gradient gradient-text">
                  formerly incarcerated
                </span>
              </strong>{" "}
              developer, content creator, and{" "}
              <strong>
                <span className="gradient gradient-text">
                  developer advocate
                </span>
              </strong>
              .
            </p>
            <div className={styles.socials}>
              <SocialIcons />
            </div>
          </div>
        </div>
        <h3 id="must-read">
          If you only read one post, you should read this one.
        </h3>
        <ContentCard
          url="/pyramid-of-challenge"
          title="Distributing Challenge: On Building Highly Engaged Teams"
          description="How many developers do you know who have left their job because either 1) the work is no longer challenging / there is no career growth, or 2) the work is too challenging, and they have no support? Challenge plays an essential role in our happiness. However, making sure that everyone on a team is adequately challenged is a complicated task."
        />
        <h3 className={styles.sectionHeader} id="guides">
          The Developer Advocate's Guides
        </h3>
        <div style={{ marginBottom: "32px" }}>
          <ContentCard
            url="/developer-advocates-guide-to-metrics-and-reporting"
            title="The Developer Advocate's Guide to Metrics and Reporting"
            description="As developer advocates, avoid becoming extensions of other teams by closely learning metrics: the different types you'll encounter and when to use them, which are trusted and untrusted, and how to build them effectively to support your team's goals."
          />
        </div>
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
        <div style={{ marginBottom: "32px" }}>
          <ContentCard
            url="/developer-advocates-guide-to-content-creation"
            title="The Developer Advocate's Guide to Content Creation"
            description={`Have you ever felt overwhelmed by the idea of having to create that next blog post or YouTube video? Do you find yourself unable to finish things because you're not quite sure when to call it done? Are you adjusting your outlines or talking points on the fly? Learn how to create content more effectively by doing the work before the work.`}
          />
        </div>
        <h3 className={styles.sectionHeader}>Appearances</h3>
        <div className={styles.appearances}>
          <div className={styles.postCard}>
            <div className={styles.postCardContent}>
              <h5>Business Insider Article</h5>
              <p>
                I had the privilege of sharing my story of incarceration and
                breaking into tech with{" "}
                <a href="https://www.businessinsider.com/author/kylie-robison">
                  Kylie Robison
                </a>
                , a journalist for Business Insider focused on developers and
                their communities, tools, startups, and more.
              </p>
              <Link href="https://www.businessinsider.com/aws-jail-formerly-incarcrated-kurt-kemple-developer-advocate-2021-4">
                <a>
                  <img
                    width="100%"
                    src="/bi-article.png"
                    alt="This former felon has a successful career in tech with stints at Amazon and hot startups — and he wants to teach other ex-cons how to do it too"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.postCard}>
            <div className={styles.postCardContent}>
              <h5>#AntiracistEconomist Podcast</h5>
              <p>
                I had the honor of being a guest on{" "}
                <a href="https://twitter.com/KimCrayton1">Kim Crayton's</a>{" "}
                podcast where we discussed white privilege, the prison
                industrial complex, and the issues of mediocre white men in
                tech.
              </p>
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
          </div>
          <div className={styles.postCard}>
            <div className={styles.postCardContent}>
              <h5>Learn with Jason x freeCodeCamp Interview</h5>
              <p>
                I spoke with long time friend{" "}
                <a href="https://twitter.com/jlengstorf">Jason Lengstorf</a>{" "}
                about my journey into tech. The main focus was on applying
                skills gained from other professions to the tech industry.
              </p>
              <YouTube youTubeId="4fq8QlpEMec" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
