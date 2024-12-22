import classNames from "classnames";
import * as React from "react";
import { Button } from "../../components/Button.js";
import styles from "./Level.module.css";
import { LevelCard } from "./LevelCard.js";
import { MakerCard } from "./MakerCard.js";

type LevelStaticProps = Pick<
  ThemeStaticData<`/${Theme}/level/${NumberParam}/${NumberParam}`>,
  "level" | "clickable"
>;

export function LevelStatic({ level, clickable }: LevelStaticProps) {
  return (
    <>
      <LevelCard
        level={{
          images: level.images,
          makerName: level.makerName,
          levelName: level.levelName,
          levelCode: level.levelCode,
          description: level.description,
          tags: level.tags,
          difficulty: level.difficulty,
          difficultyName: level.difficultyName,
        }}
      />
      <MakerCard level={level} />
      <div
        className={classNames(
          styles["Navigation"],
          level.nextAndPrev.nextLevel.exists && styles["hasNextLevel"],
          level.nextAndPrev.prevLevel.exists && styles["hasPreviousLevel"]
        )}
      >
        {level.nextAndPrev.prevLevel.exists ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            href={level.nextAndPrev.prevLevel.level.pathInfo.to}
            hidden={!level.nextAndPrev.prevLevel.exists}
            clickable={clickable}
          >
            <span className={styles["hidden"]}>Previous</span>
          </Button>
        ) : null}
        {level.nextAndPrev.nextLevel.exists ? (
          <Button
            icon="arrow-right"
            href={level.nextAndPrev.nextLevel.level.pathInfo.to}
            hidden={!level.nextAndPrev.nextLevel.exists}
            clickable={clickable}
          >
            Next level
          </Button>
        ) : null}
      </div>
    </>
  );
}