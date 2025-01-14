import * as React from "react";
import { PublicImage } from "../../../components/PublicImage.js";
import styles from "./BatchList.module.css";

type BatchListCardContentType = ThemeComponent<{
  batch: [
    "levels",
    "releaseDate",
    "batchNumber",
    "image",
    "batchName",
    "batchDescription"
  ];
  clickable: true;
}>;

export const BatchListCardContent: BatchListCardContentType = ({
  batch: {
    levels,
    releaseDate,
    batchNumber,
    batchName,
    batchDescription,
    image,
  },
}) => {
  const amountOfLevels = `${levels.length} levels`;
  return (
    <>
      {image != null ? (
        <PublicImage {...(image as any)} className={styles["BatchImage"]} />
      ) : batchNumber ? (
        <span className={styles["BatchNumber"]}>{batchNumber}</span>
      ) : null}
      <div className={styles["BatchInfo"]}>
        {batchName ? (
          <span className={styles["BatchName"]}>{batchName}</span>
        ) : null}
        {batchDescription ? (
          <span className={styles["BatchDescription"]}>{batchDescription}</span>
        ) : null}
        {amountOfLevels ? (
          <span className={styles["BatchLevelAmount"]}>{amountOfLevels}</span>
        ) : null}
        {releaseDate ? (
          <span className={styles["BatchReleaseDay"]}>{releaseDate.value}</span>
        ) : null}
      </div>
    </>
  );
};
