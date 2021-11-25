import Link from "next/link";
import DarkModeToggle from "react-dark-mode-toggle";
import { useDarkMode } from "next-dark-mode";
import styles from "@styles/Header.module.css";

export default function Header() {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.logo}>
          <a className={styles.logoLink} title="The Worst Dev">
            TWD
          </a>
        </h1>
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
              <Link href="https://achievements.theworst.dev">Polywork</Link>
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
