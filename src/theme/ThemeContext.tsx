import { capitalize, snakeCase } from "lodash";
import { createContext } from "react";
import { themeKeys } from "../data/themeKeys";
import { Theme, Themes } from "../data/types";
import { convertNumberToWord } from "./convertNumberToWord";

export type ThemeContextData = Themes[Theme];
export type ThemeContextImages = ThemeContextData["images"];
export type ThemeContextType = {
  theme: Theme;
  startDate: Date;
  info: ThemeInfo;
  themeSlug: string;
  data: ThemeContextData;
};

export type ThemeMarkdown =
  | ThemeContextData["batches"][number]["levels"][number]["description"]
  | ThemeContextData["batches"][number]["levels"][number]["makerDescription"];

export const getThemeInfo = (theme: Theme) => {
  const caps = theme.toUpperCase();
  const snake = snakeCase(theme);
  const ordinalString = snake.split("_")[0];
  const ordinal = Number(ordinalString);
  const themeYear = convertNumberToWord(ordinal, "english");
  const writtenOutOrdinal = convertNumberToWord(ordinal, "englishOrdinal");
  const writtenOut = theme.endsWith("ymm")
    ? capitalize(themeYear) + " Years of Mario Maker"
    : capitalize(writtenOutOrdinal) + " Mario Maker Celebration";
  return {
    caps,
    snake,
    ordinal,
    themeYear,
    writtenOutOrdinal,
    writtenOut,
  };
};

export function getThemePathInfo(theme: Theme, pathname: string) {
  const pathnameFromTheme = pathname.replace(`${theme}/`, "");
  const next = nextTheme(theme);
  const prev = prevTheme(theme);
  return {
    isHome: !pathnameFromTheme || pathnameFromTheme === "/",
    currentThemeUrl: `${theme}${pathnameFromTheme}`,
    nextThemeUrl: `${next}${pathnameFromTheme}`,
    prevThemeUrl: `${prev}${pathnameFromTheme}`,
    nextTheme: next,
    prevTheme: prev,
  };
}

type ThemeInfo = ReturnType<typeof getThemeInfo> &
  ReturnType<typeof getThemePathInfo>;

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const nextTheme = (current: Theme) => {
  const currentIndex = themeKeys.indexOf(current);
  if (currentIndex + 1 === themeKeys.length) {
    return;
  }
  return themeKeys[currentIndex + 1];
};
export const prevTheme = (current: Theme) => {
  const currentIndex = themeKeys.indexOf(current);
  if (currentIndex === 0) {
    return;
  }
  return themeKeys[currentIndex - 1];
};
