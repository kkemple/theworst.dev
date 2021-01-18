import React from "react";
import { Link } from "gatsby";

import Logo from "../assets/logo.svg";

export default function Layout(props) {
  return (
    <div className="p-8 w-auto">
      <header className="mx-auto max-w-screen-md flex flex-col justify-center sm:justify-between sm:items-center">
        <Link className="no-gradient" to="/">
          <img
            className="mx-auto"
            style={{ width: 160, maxWidth: 160 }}
            src={Logo}
          />
        </Link>
        <nav className="mt-4 sm-mt-0">
          <ul className="flex sm:justify-end justify-center items-center list-none bg-transparent p-0">
            <li>
              <a href="https://twitter.com/theworstdev">Twitter</a>
            </li>
            <li className="ml-3">
              <a href="https://twitch.tv/theworstdev">Twitch</a>
            </li>
            <li className="ml-3">
              <a href="https://www.youtube.com/channel/UC8Mx5fwyE7moeg-4F2CXo3Q">
                YouTube
              </a>
            </li>
            <li className="ml-3">
              <a href="https://instagram.com/kurtkemple">Instagram</a>
            </li>
            <li className="ml-3">
              <a href="/discord">Discord</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mt-16 sm:mt-32 mx-auto max-w-screen-md">
        {props.children}
      </main>
    </div>
  );
}
