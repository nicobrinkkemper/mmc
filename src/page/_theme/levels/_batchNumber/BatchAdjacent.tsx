import classNames from "clsx";
import * as React from "react";
import { Button } from "../../../../components/Button.js";
import styles from "./LevelList.module.css";

type BatchAdjacentType = ThemeComponent<{
  clickable: true;
  batch: ["adjacent"];
}>;

export const BatchAdjacent: BatchAdjacentType = ({ batch, clickable }) => {
  return (
    <div
      className={classNames(
        styles["Navigation"],
        batch.adjacent.next.exists && styles["HasNextBatch"],
        batch.adjacent.prev.exists && styles["HasPreviousBatch"]
      )}
    >
      {batch.adjacent.prev?.exists ? (
        <Button
          icon="arrow-left"
          iconPosition="left"
          href={batch.adjacent.prev.value.batchNumber}
          hidden={!batch.adjacent.prev.exists}
          clickable={clickable}
        >
          <span className={styles["hidden"]}>Previous</span>
        </Button>
      ) : null}
      {batch.adjacent.next?.exists ? (
        <Button
          icon="arrow-right"
          href={batch.adjacent.next.value.toBatch}
          hidden={!batch.adjacent.next.exists}
          clickable={clickable}
        >
          Next release
        </Button>
      ) : null}
    </div>
  );
};
