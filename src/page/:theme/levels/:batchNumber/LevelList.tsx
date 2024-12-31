import * as React from "react";
import { Card } from "../../../../components/Card.js";
import { Map } from "../../../../components/Map.js";
import styles from "./LevelList.module.css";
import { LevelListCardContent } from "./LevelListCardContent.js";

export type LevelsType = ThemeComponent<{
  batch: ["levels"];
  clickable: true;
}>;

export const LevelList: LevelsType = ({ batch: { levels }, clickable }) => {
  return (
    <Map items={levels}>
      {({
        levelName,
        images,
        nationality,
        makerName,
        tags,
        difficulty,
        difficultyName,
        batchNumber,
        order,
        makerId,
      }) => (
        <Card
          key={levelName.slug}
          className={styles["Batch"]}
          clickable={clickable}
          to={`${batchNumber}/${order}`}
          subHeading={undefined}
          images={{}}
        >
          <LevelListCardContent
            clickable={clickable}
            level={{
              images,
              levelName,
              nationality,
              makerName,
              tags,
              difficulty,
              difficultyName,
              makerId,
            }}
          />
        </Card>
      )}
    </Map>
  );
};
