import styles from "@styles/Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.container}>
      <p className={styles.bio}>
        Kurt Kemple, Founder and Principal Advisor at Forthright
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is a multidisciplinary tech leader, engineer, and teacher.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is a multidisciplinary tech leader, engineer, and teacher.
        He's the creator of The Developer Advocate's Guide series, Developer
        Experience Audits, and the Developer Advocacy Value Cycle.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt Kemple is a multidisciplinary tech leader, engineer, and teacher.
        He's the creator of The Developer Advocate's Guide series, Developer
        Experience Audits, and the Developer Advocacy Value Cycle. He's led
        developer relations and engineering teams at companies like Apollo, AWS,
        and MLS and is now focused on helping others create better developer
        experiences.
      </p>
    </div>
  );
}
