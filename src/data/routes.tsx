import * as React from "react";
import { CreditsPageStatic } from "../page/CreditsPage/CreditsPage.js";
import { HomePageStatic } from "../page/HomePage/HomePage.js";
import { LevelBatchesPageStatic } from "../page/LevelBatchesPage/LevelBatchesPage.static.js";
import { LevelBatchPageStatic } from "../page/LevelBatchPage/LevelBatchPage.js";
import { LevelPageStatic } from "../page/LevelPage/LevelPage.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";
import { getAllStaticThemePages, getStaticData } from "./getStaticData.js";

const createRoute = <P extends ValidPath>(
  staticData: ThemeStaticData<P>,
  Component: React.ComponentType<ThemeStaticData<P>>
) => ({
  path: staticData.pathInfo.to,
  staticData,
  component: (props: Clickable) => <Component {...staticData} {...props} />,
});

const createLevelRoutes = (
  batch: ThemeBatch<`/${Theme}/levels/${NumberParam}`>
) =>
  batch.levels.map(
    (level: ThemeLevel<`/${Theme}/level/${NumberParam}/${NumberParam}`>) => {
      const staticData = getStaticData(level.pathInfo.to);
      return createRoute(staticData, LevelPageStatic);
    }
  );

const createBatchRoutes = (
  batch: ThemeBatch<`/${Theme}/levels/${NumberParam}`>
) => {
  const staticData = getStaticData(batch.pathInfo.to);
  return createRoute(staticData, LevelBatchPageStatic);
};

const createHomeRoute = (staticData: ThemeStaticData) => {
  return createRoute(staticData, HomePageStatic);
};

const createLevelBatchesRoute = (themeStaticData: ThemeStaticData) => {
  const staticData = getStaticData(themeStaticData.pathInfo.toLevels);
  return createRoute(staticData, LevelBatchesPageStatic);
};

const createCreditsRoute = (themeStaticData: ThemeStaticData) => {
  const staticData = getStaticData(themeStaticData.pathInfo.toCredits);
  return createRoute(staticData, CreditsPageStatic);
};

const mapThemeBatchRoutes = (themeStaticData: ThemeStaticData) => {
  return themeStaticData.batches.map((batch) => createBatchRoutes(batch)) ?? [];
};

const mapThemeLevelRoutes = (themeStaticData: ThemeStaticData) => {
  return (
    themeStaticData.batches.flatMap((batch) => createLevelRoutes(batch)) ?? []
  );
};

const getAllRoutes = () => {
  const staticDatas = getAllStaticThemePages();
  return Object.freeze([
    createRoute(getStaticData("/"), HomePageStatic),
    ...staticDatas.flatMap((staticData) => {
      return [
        createHomeRoute(staticData),
        createLevelBatchesRoute(staticData),
        createCreditsRoute(staticData),
        ...mapThemeBatchRoutes(staticData),
        ...mapThemeLevelRoutes(staticData),
      ];
    }),
    createRoute(getStaticData("/404"), NotFoundPageStatic),
  ]);
};

export const routes = getAllRoutes();
