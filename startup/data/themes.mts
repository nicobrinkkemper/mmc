import { themeConfig } from "../themeConfig.mjs";

export type ThemeKey = keyof typeof themeConfig;
export type Theme = ThemeKey extends `_${infer P}` ? P : never;
export type ThemeKeys = ThemeKey[];
export const themeKeys = Object.keys(themeConfig) as ThemeKeys;

export const themes = Object.entries(themeConfig).map(([key, v]) => {
  const theme = key.replace("_", "") as Theme;
  return Object.assign(v, {
    key,
    theme: theme,
    caps: theme.toUpperCase(),
  });
}) as {
  key: ThemeKey;
  weektrailers: string[];
  theme: Theme;
  caps: Uppercase<Theme>;
  gid: number;
}[];
