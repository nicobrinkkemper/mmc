import classNames from "clsx";
import * as React from "react";
import { Button } from "../../../../../components/Button.js";
import { levels } from "../../../../../config/themeConfig.js";
import styles from "./Level.module.css";

type LevelAdjacentType = ThemeComponent<{
  clickable: true;
  level: ["adjacent", "batchNumber"];
  pathInfo: ["theme"];
}>;

export const LevelAdjacent: LevelAdjacentType = ({
  level,
  clickable,
  pathInfo,
}) => {
  return (
    <div
      className={classNames(
        styles["Navigation"],
        level.adjacent.next.exists && styles["HasNextLevel"],
        level.adjacent.prev.exists && styles["HasPreviousLevel"]
      )}
    >
      {level.adjacent.prev?.exists ? (
        <Button
          icon="arrow-left"
          iconPosition="left"
          href={`/${pathInfo.theme}/${levels}/${level.batchNumber}/${level.adjacent.prev.value.order}`}
          hidden={!level.adjacent.prev.exists}
          clickable={clickable}
        >
          <span className={styles["hidden"]}>Previous</span>
        </Button>
      ) : null}
      {level.adjacent.next?.exists ? (
        <Button
          icon="arrow-right"
          href={`/${pathInfo.theme}/${levels}/${level.batchNumber}/${level.adjacent.next.value.order}`}
          hidden={!level.adjacent.next.exists}
          clickable={clickable}
        >
          Next level
        </Button>
      ) : null}
    </div>
  );
};
