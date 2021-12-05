import styles from "@styles/Bio.module.css";

export default function Bio() {
  return (
    <div className={styles.container}>
      <p className={styles.bio}>Kurt Kemple, Developer Experience Consultant</p>
      <hr />
      <p className={styles.bio}>
        Kurt is a developer, content creator, and developer advocate at heart,
        but is currently focused on helping companies understand and build out
        successful developer experience programs.
      </p>
      <hr />
      <p className={styles.bio}>
        Kurt is a developer, content creator, and developer advocate at heart,
        but is currently focused on helping companies understand and build out
        successful developer experience programs. When not helping others solve
        DX problems, he can be found on the beach or at home with his family.
      </p>
    </div>
  );
}
