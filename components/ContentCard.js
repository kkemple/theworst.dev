import Link from "next/link";
import styles from "./ContentCard.module.css";

export default function ContentCard({ url, title, description }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href={url}>
          <a title={title}>
            <h5>{title}</h5>
            <p>{description}</p>
          </a>
        </Link>
      </div>
      <img
        className={styles.kakashi}
        src="/kakashi.png"
        alt="Kakashi from Naruto peeking out"
      />
    </div>
  );
}
