import * as React from "react";
import { mainTheme } from "../config/constants.js";
import { themeKeysNoPrefix } from "../config/keys.js";
import { CreditsPageStatic } from "../page/CreditsPage/CreditsPage.js";
import { HomePageStatic } from "../page/HomePage/HomePage.static.js";
import { LevelBatchesPageStatic } from "../page/LevelBatchesPage/LevelBatchesPage.static.js";
import { LevelBatchPageStatic } from "../page/LevelBatchPage/LevelBatchPage.js";
import { LevelPageStatic } from "../page/LevelPage/LevelPage.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";
import { getStaticData } from "./getStaticData.js";

const createRoute = <T extends ThemeStaticData>(
  staticData: T,
  Component: React.ComponentType<T>
) => ({
  path: staticData.pathInfo.to,
  staticData,
  component: (props: Clickable) => <Component {...staticData} {...props} />,
});

const createLevelRoutes = (theme: Theme, batch: ThemeBatch) =>
  batch.levels.map((level: ThemeLevel) => {
    const staticData = getStaticData(theme, level.pathInfo.to);
    return createRoute(
      {
        ...staticData,
        level,
        batch,
      },
      LevelPageStatic
    );
  });

const createBatchRoutes = (theme: Theme, batch: ThemeBatch) => {
  const staticData = getStaticData(theme, batch.pathInfo.to);
  return createRoute(
    {
      ...staticData,
      batch,
    },
    LevelBatchPageStatic
  );
};

const createHomeRoute = (staticData: ThemeStaticData) => {
  return createRoute(staticData, HomePageStatic);
};

const createLevelBatchesRoute = (themeStaticData: ThemeStaticData) => {
  const staticData = getStaticData(
    themeStaticData.theme,
    themeStaticData.pathInfo.toLevels
  );
  return createRoute(staticData, LevelBatchesPageStatic);
};

const createCreditsRoute = (themeStaticData: ThemeStaticData) => {
  const staticData = getStaticData(
    themeStaticData.theme,
    themeStaticData.pathInfo.toCredits
  );
  return createRoute(staticData, CreditsPageStatic);
};

const mapThemeBatchRoutes = (themeStaticData: ThemeStaticData) => {
  return (
    themeStaticData.batches?.map((batch) =>
      createBatchRoutes(themeStaticData.theme, batch)
    ) ?? []
  );
};

const mapThemeLevelRoutes = (staticData: ThemeStaticData) => {
  return (
    staticData.batches?.flatMap((batch) =>
      createLevelRoutes(staticData.theme, batch)
    ) ?? []
  );
};

const getAllRoutes = () => {
  const staticDatas = themeKeysNoPrefix.map((theme) =>
    getStaticData(theme, `/${theme}`)
  );
  return Object.freeze([
    createRoute(getStaticData(mainTheme, "/"), HomePageStatic),
    ...staticDatas.flatMap((staticData) => {
      return [
        createHomeRoute(staticData),
        createLevelBatchesRoute(staticData),
        createCreditsRoute(staticData),
        ...mapThemeBatchRoutes(staticData),
        ...mapThemeLevelRoutes(staticData),
      ];
    }),
    createRoute(getStaticData(mainTheme, "/404"), NotFoundPageStatic),
  ]);
};

export const routes = getAllRoutes();
