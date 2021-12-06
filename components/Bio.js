import styles from "@styles/Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.container}>
      <p className={styles.bio}>
        Kurt Kemple, Founder and Principal Advisor at Forthright
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is founder and Principal Advisor at Forthright where he
        helps others create better developer experiences.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is founder and Principal Advisor at Forthright. He's the
        creator of The Developer Advocate's Guide series, Developer Experience
        Audits, and the Developer Advocacy Value Cycle.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is founder and Principal Advisor at Forthright. He's the
        creator of The Developer Advocate's Guide series, Developer Experience
        Audits, and the Developer Advocacy Value Cycle. He's lead developer
        relations and engineering teams at companies like Apollo, AWS, and MLS
        and is now focused on helping others create better developer
        experiences.
      </p>
    </div>
  );
}
