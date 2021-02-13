import styles from "./Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.container}>
      <p className={styles.bio}>
        Kurt Kemple, Developer Relations Manager at Apollo GraphQL
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt is a technical writer, speaker, and software developer living in
        Virginia Beach, VA. Currently, he works for Apollo GraphQL, as a
        Developer Relations Manager.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt is a technical writer, speaker, and software developer living in
        Virginia Beach, VA. He’s very passionate about the intersection of
        technology and incarceration. Currently, he works for Apollo GraphQL, as
        a Developer Relations Manager. When not working he can be found by the
        ocean or relaxing with his family.
      </p>
    </div>
  );
}
