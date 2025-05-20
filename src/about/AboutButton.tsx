import * as React from "react";
import { Button } from "../components/Button.js";
import styles from "./AboutButton.module.css";

type AboutButtonType = ThemeComponent<{
  clickable: true;
  pathInfo: ["toAbout"];
}>;

export const AboutButton: AboutButtonType = ({
  clickable,
  pathInfo: { toAbout },
}) => {
  return (
    <>
      <Button
        href={toAbout}
        className={styles["AboutButton"]}
        icon="info-inverted"
        clickable={clickable}
      >
        About
      </Button>
    </>
  );
};
