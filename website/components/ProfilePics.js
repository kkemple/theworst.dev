import styles from "@styles/ProfilePics.module.css";

export default function ProfilePics() {
  return (
    <div className={styles.container}>
      <a href="/profile-1.jpg" download="kurtkemple">
        <img className={styles.active} src="/profile-1.jpg" />
      </a>
      <div className={styles.thumbnails}>
        <a href="/profile-2.jpg" download="kurtkemple">
          <img className={styles.inactive} src="/profile-2.jpg" />
        </a>
        <a href="/profile-3.jpg" download="kurtkemple">
          <img className={styles.inactive} src="/profile-3.jpg" />
        </a>
        <a href="/profile-4.jpg" download="kurtkemple">
          <img className={styles.inactive} src="/profile-4.jpg" />
        </a>
      </div>
      <span className={styles.explainer}>
        Click profile picture to download
      </span>
    </div>
  );
}
