import { themeConfig } from "./themeConfig.js";

/**
 * Collection of keys of the theme config, which will be used to create the base Theme type - but here it still has the `_` prefix.
 * The reason for this is that you can't write a object key with a number, so we need to start with something else.
 */
export const themeKeys = Object.keys(themeConfig) as unknown as [
  ThemeConfigKey
];

/**
 * Collection of keys of the theme config, these are all the themes we will be generating.
 * (without the `_` prefix)
 */
export const themeKeysNoPrefix = themeKeys.map((key) =>
  (key as string).replace("_", "")
) as Theme[];

/**
 * The final configuration object that will be used for the codebase.
 * (if you're looking for the theme config, it's in `themeConfig.ts`)
 */
export const config = Object.entries(themeConfig).map(([key, v]) => {
  const theme = key.replace("_", "") as Theme;
  return Object.assign(
    v as ThemeConfigRecord,
    {
      key: key as ThemeConfigKey,
      theme: theme,
      googleSheet: v.googleSheet,
      weekTrailers: v.weekTrailers,
    } as ThemeConfig
  );
});
