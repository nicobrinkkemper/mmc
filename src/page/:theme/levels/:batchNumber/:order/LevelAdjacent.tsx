import classNames from "classnames";
import * as React from "react";
import { Button } from "../../../../../components/Button.js";
import styles from "./Level.module.css";

type LevelAdjacentType = ThemeComponent<{
  clickable: true;
  level: ["adjacent"];
}>;

export const LevelAdjacent: LevelAdjacentType = ({ level, clickable }) => {
  return (
    <div
      className={classNames(
        styles["Navigation"],
        level.adjacent.next.exists && styles["hasNextLevel"],
        level.adjacent.prev.exists && styles["hasPreviousLevel"]
      )}
    >
      {level.adjacent.prev?.exists ? (
        <Button
          icon="arrow-left"
          iconPosition="left"
          href={level.adjacent.prev.value.order}
          hidden={!level.adjacent.prev.exists}
          clickable={clickable}
        >
          <span className={styles["hidden"]}>Previous</span>
        </Button>
      ) : null}
      {level.adjacent.next?.exists ? (
        <Button
          icon="arrow-right"
          href={level.adjacent.next.value.order}
          hidden={!level.adjacent.next.exists}
          clickable={clickable}
        >
          Next level
        </Button>
      ) : null}
    </div>
  );
};
