import themes from "./themes.json" assert { type: "json" };

export type Themes = typeof themes;
export type ThemeKeys = (keyof Themes)[];
export type Theme = ThemeKeys[number];
