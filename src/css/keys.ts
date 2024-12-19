import * as themesCss from "./index.js";

export const themeCssModuleKeys = Object.keys(
  themesCss
) as (keyof typeof themesCss)[];
