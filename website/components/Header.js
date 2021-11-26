import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "react-dark-mode-toggle";
import { useDarkMode } from "next-dark-mode";
import styles from "@styles/Header.module.css";
import { RiMenuLine, RiCloseFill } from "react-icons/ri";

export default function Header() {
  const [showMenu, toggleMenu] = useState(false);
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

  const toggle = () => {
    toggleMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.logo}>
          <a className={styles.logoLink} title="The Worst Dev">
            TWD
          </a>
        </h1>
      </Link>
      <div
        className={`${styles.navAndToggle} ${
          showMenu ? styles.showMobileMenu : ""
        }`}
      >
        <nav>
          <ul className={styles.nav}>
            <li onClick={toggle}>
              <Link href="/content">Content</Link>
            </li>
            <li onClick={toggle}>
              <Link href="/resources">Resources</Link>
            </li>
            <li onClick={toggle}>
              <Link href="/shop">Shop</Link>
            </li>
            <li onClick={toggle}>
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
      <button className={styles.menuToggle} onClick={toggle}>
        {showMenu ? <RiCloseFill /> : <RiMenuLine />}
      </button>
    </header>
  );
}
