import * as React from "react";
import { AppStatic } from "../../App.js";
import { Button } from "../../components/Button.js";
import { Layout } from "../../layout/Layout.js";
import { BatchesStatic } from "./Batches.js";

export const LevelBatchesPageStatic: LevelBatchesPageType = ({
  levelData,
  images,
  pathInfo,
  clickable,
  adjacent,
}) => {
  return (
    <AppStatic pathInfo={pathInfo}>
      <Layout
        type="special"
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
        adjacent={adjacent}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={pathInfo.toHome}
          inverted={true}
          clickable={clickable}
        >
          Back to Welcome
        </Button>
        <BatchesStatic levelData={levelData} clickable={clickable} />
      </Layout>
    </AppStatic>
  );
};
