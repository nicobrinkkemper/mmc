import { themeConfig } from "./constants.js";

export const themeKeys = Object.keys(themeConfig) as unknown as [
  ThemeConfigKey
];

export const themeKeysNoPrefix = themeKeys.map((key) =>
  (key as string).replace("_", "")
) as ThemeConfigTheme[];

export type ThemeConfigRecord = {
  [K in keyof ThemeConfigValue[ThemeConfigKey]]: ThemeConfigValue[ThemeConfigKey][K];
};

/**
 * The final configuration object that will be used for the codebase.
 */
export const config = Object.entries(themeConfig).map(([key, v]) => {
  const theme = key.replace("_", "") as ThemeConfigTheme;
  return Object.assign(v as ThemeConfigRecord, {
    key: key as ThemeConfigKey,
    theme: theme,
    info: {
      gid: v.gid,
    },
  });
});
