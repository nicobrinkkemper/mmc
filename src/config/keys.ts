// before we define the config, we take the change to define the types we want from the csv and reuse elsewhere throughout the codebase

import { themeConfig } from "./themeConfig.js";

export const themeKeys = Object.keys(themeConfig) as unknown as [
  ThemeConfigKey
];
export const themeKeysNoPrefix = themeKeys.map((key) =>
  (key as string).replace("_", "")
) as Theme[];
