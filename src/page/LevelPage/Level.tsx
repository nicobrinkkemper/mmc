import classNames from "classnames";
import * as React from "react";
import { Button } from "../../components/Button.js";
import styles from "./Level.module.css";
import { LevelCard } from "./LevelCard.js";
import { MakerCard } from "./MakerCard.js";


export const LevelStatic: ThemePageComponent<
  `/${Theme}/level/${NumberParam}/${NumberParam}`,
  {
    level: pickRequired<
      [
        "images",
        "makerName",
        "nationality",
        "makerId",
        "makerDescription",
        "levelName",
        "levelCode",
        "description",
        "tags",
        "difficulty",
        "difficultyName",
        "adjacent"
      ]
    >;
    clickable: required;
  }
> = ({ level, clickable }) => {
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
      <MakerCard
        level={{
          makerName: level.makerName,
          nationality: level.nationality,
          makerId: level.makerId,
          images: level.images,
          makerDescription: level.makerDescription,
        }}
      />
      <div
        className={classNames(
          styles["Navigation"],
          level.adjacent.next.exists && styles["hasNextLevel"],
          level.adjacent.prev.exists && styles["hasPreviousLevel"]
        )}
      >
        {level.adjacent.prev.exists ? (
          <Button
            icon="arrow-left"
            iconPosition="left"
            href={level.adjacent.prev.value.pathInfo.to}
            hidden={!level.adjacent.prev.exists}
            clickable={clickable}
          >
            <span className={styles["hidden"]}>Previous</span>
          </Button>
        ) : null}
        {level.adjacent.next.exists ? (
          <Button
            icon="arrow-right"
            href={level.adjacent.next.value.pathInfo.to}
            hidden={!level.adjacent.next.exists}
            clickable={clickable}
          >
            Next level
          </Button>
        ) : null}
      </div>
    </>
  );
};