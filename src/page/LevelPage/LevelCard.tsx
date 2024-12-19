import * as React from "react";
import { CompileJSX } from "../../CompileJSX.js";
import { Card } from "../../components/Card.js";
import { Difficulty } from "../../components/Difficulty.js";
import { PublicImage } from "../../components/PublicImage.js";
import { Tags } from "../../components/Tags.js";
import styles from "./LevelCard.module.css";

type LevelCardProps = {
  level: Pick<
    ThemeLevel,
    | "makerName"
    | "levelName"
    | "images"
    | "levelCode"
    | "description"
    | "tags"
    | "difficulty"
    | "difficultyName"
  >;
};

export function LevelCard({ level }: Readonly<LevelCardProps>) {
  return (
    <Card className={styles["LevelCard"]}>
      <div
        style={{
          maxWidth: level.images.level.width + "px",
          justifySelf: "center",
        }}
      >
        <h2>{level.levelName.name}</h2>
        <PublicImage
          alt={`Screenshot: ${level.makerName.name}`}
          src={level.images.level.src}
          srcSet={level.images.level.srcSet}
          width={level.images.level.width}
          height={level.images.level.height}
          className={styles["LevelImage"]}
        />
        <h3 className={styles["LevelCode"]}>
          {level.levelCode ?? "Code coming soon"}
        </h3>
      </div>
      <div className={styles["TagsAndDifficulty"]}>
        <Tags tags={level.tags} />
        <Difficulty
          difficulty={level.difficulty}
          difficultyName={level.difficultyName}
        />
      </div>
      <div className={styles["Description"]}>
        <CompileJSX>{level.description}</CompileJSX>
      </div>
    </Card>
  );
}
