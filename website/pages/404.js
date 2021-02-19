import styles from "@styles/404.module.css";

export default function FourOhFour() {
  return (
    <main className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <img src="/kakashi-disappear.gif" alt="Kakashi disappearing" />
    </main>
  );
}
