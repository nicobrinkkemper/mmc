import * as React from "react";
import { Button } from "../components/Button.js";
import styles from "./AboutButton.module.css";

export const AboutButton = ({
  currentThemeUrl,
  clickable,
}: {
  currentThemeUrl: string;
} & Clickable) => {
  return (
    <Button
      href={`/${currentThemeUrl}#!/about`}
      className={styles["AboutButton"]}
      icon="info-inverted"
      clickable={clickable}
    >
      {currentThemeUrl}
    </Button>
  );
};
