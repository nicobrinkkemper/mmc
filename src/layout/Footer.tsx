import * as React from "react";
import { baseURL } from "../config/env.server.js";
import styles from "./Footer.module.css";

type FooterType = ThemeComponent<{
  pathInfo: pickRequired<["toCredits"]>;
  clickable: true;
}>;

export const Footer: FooterType = ({
  pathInfo: { toCredits },
  clickable: Clickable,
}) => {
  return (
    <footer className={styles["Footer"]}>
      <a
        href="https://discord.gg/8mnW3XfZq9"
        rel="noopener noreferrer"
        target="_BLANK"
      >
        Discord
      </a>
      <a
        href="https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ"
        rel="noopener noreferrer"
        target="_BLANK"
      >
        Youtube
      </a>
      <Clickable relative={"route"} href={baseURL(toCredits)}>
        Credits
      </Clickable>
    </footer>
  );
};
