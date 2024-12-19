import * as React from "react";
import styles from "./Footer.module.css";

export type FooterStaticProps = {
  pathInfo: Pick<ThemePathInfo, "toCredits">;
  clickable?: React.ElementType;
};

export function FooterStatic({
  pathInfo: { toCredits },
  clickable: Clickable = "a",
}: FooterStaticProps) {
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
      <Clickable relative={"route"} href={toCredits}>
        Credits
      </Clickable>
    </footer>
  );
}
