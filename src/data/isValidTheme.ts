import { themes } from "../config/themeConfig.js";

export const isValidTheme = (_theme: unknown): _theme is Theme => {
  return themes.includes(_theme as never);
};
