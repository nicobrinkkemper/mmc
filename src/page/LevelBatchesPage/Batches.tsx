import * as React from "react";
import { Card } from "../../components/Card.js";
import styles from "./Batches.module.css";

const ToBatchCard: ThemePageComponent<
  `/${Theme}/levels/${string}`,
  {
    batch: pickRequired<["pathInfo", "levels", "releaseDate"]>;
    clickable: required;
  }
> = ({ batch, clickable }) => {
  const amountOfLevels = `${batch.levels.length} levels`;
  return (
    <Card
      className={styles["BatchCard"]}
      clickable={clickable}
      heading={undefined}
      subHeading={undefined}
      images={{}}
    >
      <span className={styles["BatchNumber"]}>
        {batch.pathInfo.params.batchNumber}
      </span>
      <div className={styles["BatchInfo"]}>
        <span className={styles["BatchReleaseDay"]}>
          {batch.releaseDate.formatted}
        </span>
        <span className={styles["BatchLevelAmount"]}>{amountOfLevels}</span>
      </div>
    </Card>
  );
};

const createMapReleaseDays = (clickable: React.ElementType) =>
  function mapReleaseDays(batch: ThemeBatch<`/${Theme}/levels/${string}`>) {
    return (
      <ToBatchCard
        key={batch.pathInfo.params.batchNumber}
        batch={batch}
        clickable={clickable}
      />
    );
  };

export const BatchesStatic: ThemePageComponent<
  `/${Theme}/levels`,
  {
    levelData: pickRequired<["batches"]>;
    clickable: true;
  }
> = (props) => {
  if (!props.levelData.batches.length) {
    return <div className={styles["Batches"]}>No batches yet, stay tuned!</div>;
  }
  const mapper = createMapReleaseDays(props.clickable);
  return (
    <div className={styles["Batches"]}>
      {props.levelData.batches.map(mapper)}
    </div>
  );
};
