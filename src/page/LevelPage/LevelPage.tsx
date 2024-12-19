import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToBatch } from "../../components/BackButton.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { LevelStatic } from "./Level.js";

export type LevelPageStaticProps = Pick<
  ThemeStaticData,
  "theme" | "images" | "pathInfo" | "clickable"
> & {
  level: ThemeLevel;
  batch: ThemeBatch;
};

export function LevelPageStatic({
  theme,
  images,
  level,
  batch,
  pathInfo,
  clickable,
}: LevelPageStaticProps) {
  return (
    <AppStatic theme={theme}>
      <LayoutStatic
        small
        type="simple"
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
      >
        <BackToBatch batch={batch} clickable={clickable} />
        <LevelStatic level={level} clickable={clickable} />
      </LayoutStatic>
    </AppStatic>
  );
}
