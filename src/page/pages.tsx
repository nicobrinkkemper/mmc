import * as NotFound from "./404/index.js";
import * as Credits from "./_theme/credits/index.js";
import * as Home from "./_theme/index.js";
import * as Level from "./_theme/levels/_batchNumber/_order/index.js";
import * as LevelBatch from "./_theme/levels/_batchNumber/index.js";
import * as LevelBatches from "./_theme/levels/index.js";
import * as MainPage from "./index.js";

export const pages = {
  [MainPage.route]: MainPage,
  [Home.route]: Home,
  [NotFound.route]: NotFound,
  [Credits.route]: Credits,
  [LevelBatches.route]: LevelBatches,
  [LevelBatch.route]: LevelBatch,
  [Level.route]: Level,
} as const;
