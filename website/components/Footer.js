import SocialIcons from "./SocialIcons";
import Link from "next/link";
import styles from "@styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <SocialIcons />
      <Link href="https://theworst.dev/subscribe">
        <a className={styles.link}>Did we just become best friends? 💖</a>
      </Link>
    </div>
  );
}
