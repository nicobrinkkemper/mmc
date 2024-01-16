import _themeKeys from "./themesKeys.json";
import type { ThemeKeys } from "./types";

export const themeKeys = _themeKeys as ThemeKeys;

export const isValidTheme = (
  _theme: string | ThemeKeys
): _theme is ThemeKeys => {
  return themeKeys.includes(_theme as never);
};
