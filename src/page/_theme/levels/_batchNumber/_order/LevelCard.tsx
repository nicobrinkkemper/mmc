import * as React from "react";
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
        key="image-container"
        style={{
          maxWidth: images.level.width + "px",
          justifySelf: "center",
        }}
      >
        <PublicImage
          key="level-image"
          alt={`Screenshot: ${makerName.value}`}
          src={images.level.src}
          srcSet={images.level.srcSet}
          width={images.level.width}
          height={images.level.height}
          className={styles["LevelImage"]}
        />
        <h3 key="level-code" className={styles["LevelCode"]}>{levelCode}</h3>
      </div>
      <div key="tags-difficulty" className={styles["TagsAndDifficulty"]}>
        <Tags level={{ tags: tags }} />
        <Difficulty
          level={{
            difficulty: difficulty,
            difficultyName: difficultyName,
          }}
        />
      </div>
      <div key="description" className={styles["Description"]}>
        <div>{description}</div>
      </div>
    </Card>
  );
};
