import * as React from "react";
import { CompileJSX } from "../../../../../CompileJSX.js";
import { Card } from "../../../../../components/Card.js";
import { Difficulty } from "../../../../../components/Difficulty.js";
import { PublicImage } from "../../../../../components/PublicImage.js";
import { Tags } from "../../../../../components/Tags.js";
import styles from "./LevelCard.module.css";

type LevelCardType = ThemeComponent<{
  level: [
    "levelCode",
    "levelName",
    "makerName",
    "images",
    "tags",
    "difficulty",
    "difficultyName",
    "description",
    "tags"
  ];
}>;

export const LevelCard: LevelCardType = ({
  level: {
    levelCode,
    levelName,
    makerName,
    images,
    tags,
    difficulty,
    difficultyName,
    description,
  },
}) => {
  return (
    <Card
      className={styles["LevelCard"]}
      heading={undefined}
      subHeading={levelName.value}
      images={{}}
      clickable={undefined}
    >
      <div
        style={{
          maxWidth: images.level.width + "px",
          justifySelf: "center",
        }}
      >
        <PublicImage
          alt={`Screenshot: ${makerName.value}`}
          src={images.level.src}
          srcSet={images.level.srcSet}
          width={images.level.width}
          height={images.level.height}
          className={styles["LevelImage"]}
        />
        <h3 className={styles["LevelCode"]}>{levelCode}</h3>
      </div>
      <div className={styles["TagsAndDifficulty"]}>
        <Tags level={{ tags: tags }} />
        <Difficulty
          level={{
            difficulty: difficulty,
            difficultyName: difficultyName,
          }}
        />
      </div>
      <div className={styles["Description"]}>
        <CompileJSX>{description}</CompileJSX>
      </div>
    </Card>
  );
};
