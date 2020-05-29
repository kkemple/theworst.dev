import React from "react";
import { Link } from "gatsby";

import Logo from "../assets/logo.svg";

export default function Layout(props) {
  return (
    <div className="p-8 w-auto">
      <header className="mx-auto max-w-screen-md flex justify-between items-center">
        <Link className="no-gradient" to="/">
          <img className="w-40" src={Logo} />
        </Link>
        <nav>
          <ul className="flex justify-end items-center list-none bg-transparent">
            <li>
              <a href="https://twitter.com/kurtkemple">Twitter</a>
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
          </ul>
        </nav>
      </header>
      <main className="mt-32 mx-auto max-w-screen-md">{props.children}</main>
    </div>
  );
}
