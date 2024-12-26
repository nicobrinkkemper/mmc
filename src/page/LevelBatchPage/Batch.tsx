import * as React from "react";
import { Card } from "../../components/Card.js";
import { Difficulty } from "../../components/Difficulty.js";
import { MakerName } from "../../components/MakerName.js";
import { PublicImage } from "../../components/PublicImage.js";
import { Tags } from "../../components/Tags.js";
import styles from "./Batch.module.css";

function BatchLevelCard({
  level,
  levelIndex,
  clickable,
}: Readonly<{
  level: ThemeLevel<`/${Theme}/level/${NumberParam}/${NumberParam}`>;
  levelIndex: number;
  clickable: React.ElementType;
}>) {
  return (
    <Card
      heading={levelIndex === 0 ? level.releaseDate.formatted : undefined}
      key={level.levelName.slug}
      className={styles["Batch"]}
      clickable={clickable}
      subHeading={undefined}
      images={{}}
    >
      <PublicImage
        alt={level.levelName.value}
        {...level.images.levelThumbnail}
      />
      <div className={styles["Info"]}>
        <h2>{level.levelName.value}</h2>
        <MakerName
          nationality={level.nationality}
          makerName={level.makerName.value}
        />
        <div className={styles["LevelInfo"]}>
          <Tags level={{ tags: level.tags }} />
          <Difficulty
            level={{
              difficulty: level.difficulty,
              difficultyName: level.difficultyName,
            }}
          />
        </div>
      </div>
    </Card>
  );
}

const createMapLevels = (clickable: React.ElementType = "a") =>
  function mapLevels<P extends `/${Theme}/level/${string}/${string}`>(
    level: ThemeLevel<P>,
    orderIndex: number
  ) {
    return (
      <BatchLevelCard
        key={level.levelName.slug}
        level={level}
        levelIndex={orderIndex}
        clickable={clickable}
      />
    );
  };

export function BatchStatic({
  batch,
  clickable,
}: { batch: ThemeBatch<`/${Theme}/levels/${NumberParam}`> } & Clickable) {
  const mapper = createMapLevels(clickable);
  return <>{batch.levels.map(mapper)}</>;
}
