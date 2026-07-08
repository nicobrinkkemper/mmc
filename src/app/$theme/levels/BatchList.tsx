import * as React from "react";
import { Card } from "../../../components/Card.js";
import { Map } from "../../../components/Map.js";
import { levels } from "../../../config/themeConfig.js";
import styles from "./BatchList.module.css";
import { BatchListCardContent } from "./BatchListCardContent.js";

type BatchesType = ThemeComponent<{
  batches: true;
  clickable: true;
  pathInfo: ["theme"];
}>;

export const BatchList: BatchesType = ({ batches, clickable, pathInfo }) => {
  if (!batches.length) {
    return (
      <div className={styles["Batches"]}>No releases yet, stay tuned!</div>
    );
  }
  return (
    <Map items={batches}>
      {(batch) => (
        <Card
          className={styles["BatchCard"]}
          clickable={clickable}
          heading={undefined}
          subHeading={undefined}
          images={{}}
          to={`/${pathInfo.theme}/${levels}/${batch.batchNumber}`}
          key={batch.batchNumber}
        >
          <BatchListCardContent
            key={batch.batchNumber}
            batch={batch}
            clickable={clickable}
          />
        </Card>
      )}
    </Map>
  );
};
