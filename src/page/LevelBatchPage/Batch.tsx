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
  clickable: Clickable,
}: Readonly<{
  level: ThemeLevel<`/${Theme}/level/${NumberParam}/${NumberParam}`>;
  levelIndex: number;
  clickable: React.ElementType;
}>) {
  return (
    <Card
      heading={levelIndex === 0 ? level.releaseDate.formatted : undefined}
      key={level.levelName.slug}
      href={level.pathInfo.to}
      className={styles["Batch"]}
      clickable={Clickable}
    >
      <PublicImage
        alt={level.levelName.name}
        {...level.images.levelThumbnail}
      />
      <div className={styles["Info"]}>
        <h2>{level.levelName.name}</h2>
        <MakerName
          nationality={level.nationality}
          makerName={level.makerName.name}
        />
        <div className={styles["LevelInfo"]}>
          <Tags tags={level.tags} />
          <Difficulty {...level} />
        </div>
      </div>
    </Card>
  );
}

const createMapLevels = (clickable: React.ElementType = "a") =>
  function mapLevels<
    P extends `/${T}/level/${B}/${O}`,
    T extends Theme,
    B extends NumberParam,
    O extends NumberParam
  >(level: ThemeLevel<P, T, B, O>, orderIndex: number) {
    return (
      <BatchLevelCard
        key={level.levelName.name}
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
