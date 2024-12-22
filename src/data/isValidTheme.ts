import { themeKeysNoPrefix } from "../config/config.js";

export const isValidTheme = (_theme: unknown): _theme is Theme => {
  return themeKeysNoPrefix.includes(_theme as never);
};
