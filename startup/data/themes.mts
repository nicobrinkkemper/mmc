import { themeConfig } from "../themeConfig.mjs";

export type ThemeConfig = typeof themeConfig;
export type ThemeKey = keyof ThemeConfig;
export type Theme = ThemeKey extends `_${infer P}` ? P : never;
export type ThemeKeys = ThemeKey[];
export const themeKeys = Object.keys(themeConfig) as ThemeKeys;

export const themes = Object.entries(themeConfig).map(([key, v]) => {
  const theme = key.replace("_", "") as Theme;
  return Object.assign(
    v as {
      [K in keyof ThemeConfig[ThemeKey]]: ThemeConfig[ThemeKey][K];
    },
    {
      key: key as ThemeKey,
      theme: theme,
      caps: theme.toUpperCase() as Uppercase<Theme>,
    }
  );
});
