import Link from "next/link";
import styles from "@styles/ContentCard.module.css";

export default function ContentCard({ url, title, description, image, style }) {
  const content = (
    <div className={styles.content}>
      <Link href={url}>
        <a>
          {image && <img src={image.src} alt={image.altText} />}
          <h5>{title}</h5>
          {description && <p>{description}</p>}
        </a>
      </Link>
    </div>
  );

  return style === "outline" ? (
    <div className={`${styles.container} ${styles.outline}`}>{content}</div>
  ) : (
    <div className={styles.container}>{content}</div>
  );
}
