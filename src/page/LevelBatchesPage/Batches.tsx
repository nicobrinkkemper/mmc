import * as React from "react";
import { Card } from "../../components/Card.js";
import styles from "./Batches.module.css";

function BatchesCard({
  batch,
  clickable,
}: {
  readonly batch: ThemeBatch<`/${Theme}/levels/${NumberParam}`>;
} & Clickable) {
  const amountOfLevels = `${batch.levels.length} levels`;
  return (
    <Card
      className={styles["BatchCard"]}
      href={`${batch.pathInfo.to}`}
      clickable={clickable}
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
}

const createMapReleaseDays = (clickable: React.ElementType) =>
  function mapReleaseDays(
    batch: ThemeBatch<`/${Theme}/levels/${NumberParam}`>
  ) {
    return (
      <BatchesCard
        key={batch.pathInfo.params.batchNumber}
        batch={batch}
        clickable={clickable}
      />
    );
  };

export function BatchesStatic(
  props: Pick<ThemeStaticData<`/${Theme}/levels`>, "batches"> & Clickable
) {
  if (!props.batches.length) {
    return <div className={styles["Batches"]}>No batches yet, stay tuned!</div>;
  }
  const mapper = createMapReleaseDays(props.clickable);
  return <div className={styles["Batches"]}>{props.batches.map(mapper)}</div>;
}
