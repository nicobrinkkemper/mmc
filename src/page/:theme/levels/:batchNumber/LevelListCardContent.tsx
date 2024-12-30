import * as React from "react";
import { Difficulty } from "../../../../components/Difficulty.js";
import { MakerName } from "../../../../components/MakerName.js";
import { PublicImage } from "../../../../components/PublicImage.js";
import { Tags } from "../../../../components/Tags.js";
import styles from "./LevelList.module.css";

export type LevelListCardContentType = ThemeComponent<{
  level: [
    "images",
    "levelName",
    "nationality",
    "makerName",
    "tags",
    "difficulty",
    "difficultyName"
  ];
  clickable: true;
}>;

export const LevelListCardContent: LevelListCardContentType = ({
  level: {
    images,
    levelName,
    nationality,
    makerName,
    tags,
    difficulty,
    difficultyName,
  },
}) => {
  return (
    <>
      <PublicImage {...images.levelThumbnail} />
      <div className={styles["Info"]}>
        <h2>{levelName.value}</h2>
        <MakerName nationality={nationality} makerName={makerName.value} />
        <div className={styles["LevelInfo"]}>
          <Tags level={{ tags }} />
          <Difficulty
            level={{
              difficulty,
              difficultyName,
            }}
          />
        </div>
      </div>
    </>
  );
};
