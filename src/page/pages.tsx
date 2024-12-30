import * as NotFound from "./404/index.js";
import * as Credits from "./:theme/credits/index.js";
import * as Home from "./:theme/index.js";
import * as Level from "./:theme/levels/:batchNumber/:order/index.js";
import * as LevelBatch from "./:theme/levels/:batchNumber/index.js";
import * as LevelBatches from "./:theme/levels/index.js";
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
