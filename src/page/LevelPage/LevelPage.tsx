import * as React from "react";
import { AppStatic } from "../../App.js";
import { Button } from "../../components/Button.js";
import { Layout } from "../../layout/Layout.js";
import { LevelStatic } from "./Level.js";

export const LevelPageStatic: LevelPageType = ({
  images,
  level,
  batch,
  pathInfo,
  clickable,
}) => {
  return (
    <AppStatic pathInfo={pathInfo}>
      <Layout
        small
        type="simple"
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
        adjacent={undefined as never}
      >
        <Button
          icon="arrow-left-inverted"
          iconPosition="left"
          href={batch.pathInfo.to}
          inverted={true}
          clickable={clickable}
        >
          {`Back to ${batch.releaseDate.formatted}`}
        </Button>
        <LevelStatic level={level} clickable={clickable} />
      </Layout>
    </AppStatic>
  );
};
