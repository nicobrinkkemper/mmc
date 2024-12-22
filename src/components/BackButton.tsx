import * as React from "react";
import styles from "./BackButton.module.css";
import { Button } from "./Button.js";

export function BackToBatch({
  batch,
  clickable,
}: {
  batch: Pick<
    ThemeBatch<`/${Theme}/levels/${NumberParam}`>,
    "pathInfo" | "releaseDate"
  >;
} & Clickable) {
  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      href={batch.pathInfo.to}
      inverted={true}
      className={styles["BackButton"]}
      clickable={clickable}
    >
      {`Back to ${batch.releaseDate.formatted}`}
    </Button>
  );
}

export function BackToWeeks({
  toLevels,
  clickable,
}: Pick<ThemePathInfo, "toLevels"> & Clickable) {
  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      href={toLevels}
      inverted={true}
      className={styles["BackButton"]}
      clickable={clickable}
    >
      Back to Overview
    </Button>
  );
}

export function BackToWelcome({
  themeSlug,
  clickable,
}: Pick<ThemePathInfo, "themeSlug"> & Clickable) {
  return (
    <Button
      icon="arrow-left-inverted"
      iconPosition="left"
      href={themeSlug}
      inverted={true}
      className={styles["BackButton"]}
      clickable={clickable}
    >
      Back to Welcome
    </Button>
  );
}
