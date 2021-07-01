import Link from "next/link";
import DarkModeToggle from "react-dark-mode-toggle";
import { useDarkMode } from "next-dark-mode";
import styles from "@styles/Header.module.css";

export default function Header() {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logoLink}>
          <img src="/logo.png" alt="The Worst Dev" className={styles.logo} />
        </a>
      </Link>
      <div className={styles.navAndToggle}>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/content">Content</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="https://theworst.dev/subscribe">Newsletter</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.toggle}>
          <DarkModeToggle
            size={60}
            speed={2}
            checked={darkModeActive}
            onChange={(isDarkMode) =>
              isDarkMode ? switchToDarkMode() : switchToLightMode()
            }
          />
        </div>
      </div>
    </header>
  );
}
