import styles from "./Billboard.module.css";

export default function Billboard({ title }) {
  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      {title && <h1 className={styles.title}>{title}</h1>}
    </div>
  );
}
