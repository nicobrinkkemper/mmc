import { capitalize } from "lodash-es";
import { mainTheme } from "../config/themeConfig.js";
import { safeSnakecase } from "../utils/safeSnakecase.js";
import { convertNumberToWord } from "./convertNumberToWord.js";

export const getThemeInfo = <T extends Theme = Theme>(
  theme: T
): ThemeInfo<T> => {
  if (!theme) {
    theme = mainTheme as T;
  }
  const caps = theme.toUpperCase() as ThemeInfo<T>["caps"];
  const slug = theme;
  const snake = safeSnakecase(theme);
  const ordinalString = snake.split("_")[0];
  const ordinal = Number(ordinalString);
  const themeYear = convertNumberToWord(
    ordinal,
    "english"
  ) as ThemeInfo<T>["themeYear"];
  const writtenOutOrdinal = convertNumberToWord(ordinal, "englishOrdinal");
  const writtenOut = theme.endsWith("ymm")
    ? capitalize(themeYear) + " Years of Mario Maker"
    : capitalize(writtenOutOrdinal) + " Mario Maker Celebration";
  return {
    slug,
    caps,
    snake,
    ordinal,
    themeYear,
    writtenOutOrdinal,
    writtenOut,
  };
};
