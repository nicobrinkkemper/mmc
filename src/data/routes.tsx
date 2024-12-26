import { HomePageStatic } from "../page/HomePage/HomePage.js";
import { LevelBatchesPageStatic } from "../page/LevelBatchesPage/LevelBatchesPage.js";
import { LevelBatchPageStatic } from "../page/LevelBatchPage/LevelBatchPage.js";
import { LevelPageStatic } from "../page/LevelPage/LevelPage.js";
import { createRoute } from "./createRoute.js";
import {
  homePages,
  leveBatchPages,
  levelBatchesPages,
  levelPages,
} from "./staticData.js";

const homeRoutes = homePages.map((homePage) =>
  createRoute(homePage, HomePageStatic)
);
const levelBatchesRoutes = levelBatchesPages.map((levelBatchesPage) =>
  createRoute(levelBatchesPage, LevelBatchesPageStatic)
);
const leveBatchRoutes = leveBatchPages.map((leveBatchPage) =>
  createRoute(leveBatchPage, LevelBatchPageStatic)
);
const levelRoutes = levelPages.map((levelPage) =>
  createRoute(levelPage, LevelPageStatic)
);

export const routes = [
  ...homeRoutes,
  ...levelBatchesRoutes,
  ...leveBatchRoutes,
  ...levelRoutes,
];
