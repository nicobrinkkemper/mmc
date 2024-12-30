import * as React from "react";
import { Button } from "../components/Button.js";
import styles from "./AboutButton.module.css";

type AboutButtonType = ThemeComponent<{
  clickable: true;
}>;

export const AboutButton: AboutButtonType = ({ clickable }) => {
  return (
    <>
      <Button
        href={`#/about`}
        className={styles["AboutButton"]}
        icon="info-inverted"
        clickable={clickable}
      >
        About
      </Button>
    </>
  );
};
