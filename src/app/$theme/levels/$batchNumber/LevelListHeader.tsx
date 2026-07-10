import * as React from "react";
import { PublicImage } from "../../../../components/PublicImage.js";
import styles from "./LevelList.module.css";

export type LevelListHeaderType = ThemeComponent<{
  batch: ["batchName", "batchDescription", "image"];
}>;

export const LevelListHeader: LevelListHeaderType = ({
  batch: { batchName, batchDescription, image },
}) => {
  return (
    <div className={styles["LevelListHeader"]}>
      {image != null ? <PublicImage {...(image as any)} /> : null}
      <div className={styles["LevelListInfo"]}>
        {batchName ? (
          <span className={styles["LevelListTitle"]}>{batchName}</span>
        ) : null}
        {batchDescription ? (
          <span className={styles["LevelListDescription"]}>
            {batchDescription}
          </span>
        ) : null}
      </div>
    </div>
  );
};
