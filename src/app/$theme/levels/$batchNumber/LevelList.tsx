import * as React from "react";
import { Card } from "../../../../components/Card.js";
import { Map } from "../../../../components/Map.js";
import { levels } from "../../../../config/themeConfig.js";
import styles from "./LevelList.module.css";
import { LevelListCardContent } from "./LevelListCardContent.js";

export type LevelsType = ThemeComponent<{
  batch: ["levels"];
  clickable: true;
  pathInfo: ["theme"];
}>;

export const LevelList: LevelsType = ({ batch, clickable, pathInfo }) => {
  return (
    <>
      <Map items={batch.levels}>
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
            to={`/${pathInfo.theme}/${levels}/${batchNumber}/${order}`}
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
    </>
  );
};
