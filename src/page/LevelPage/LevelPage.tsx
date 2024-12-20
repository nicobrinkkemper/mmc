import * as React from "react";
import { AppStatic } from "../../App.js";
import { BackToBatch } from "../../components/BackButton.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { LevelStatic } from "./Level.js";

export type LevelPageStaticProps =
  ThemeStaticData<`/${Theme}/level/${string}/${string}`>;

export function LevelPageStatic({
  theme,
  images,
  level,
  batch,
  pathInfo,
  clickable,
}: LevelPageStaticProps) {
  return (
    <AppStatic theme={theme} images={images}>
      <LayoutStatic
        small
        type="simple"
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
      >
        <BackToBatch
          batch={{
            releaseDate: batch?.releaseDate,
            pathInfo: batch?.pathInfo,
          }}
          clickable={clickable}
        />
        <LevelStatic level={level} clickable={clickable} />
      </LayoutStatic>
    </AppStatic>
  );
}
