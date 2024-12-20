import * as React from "react";
import { AppStatic } from "../../App.js";
import { BackToWelcome } from "../../components/BackButton.js";
import { mainTheme } from "../../config/constants.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { BatchesStatic } from "./Batches.js";

export type LevelBatchesPageStaticProps = ThemeStaticData<`/${Theme}/levels`> &
  Clickable;

export function LevelBatchesPageStatic({
  batches,
  theme = mainTheme,
  images,
  pathInfo,
  clickable = "a",
}: LevelBatchesPageStaticProps) {
  return (
    <AppStatic theme={theme} images={images}>
      <LayoutStatic
        theme={theme}
        images={images}
        pathInfo={pathInfo}
        clickable={clickable}
      >
        <BackToWelcome themeSlug={pathInfo.themeSlug} clickable={clickable} />
        <BatchesStatic batches={batches} clickable={clickable} />
      </LayoutStatic>
    </AppStatic>
  );
}
