import { isValidTheme, mainTheme } from "../config/themeConfig.js";

export async function getTheme<T extends Theme = Theme>(theme: T | string) {
  if (!isValidTheme(theme)) {
    theme = mainTheme;
  }
  const themeData = await import(`./generated/${theme}.ts`);

  return themeData[`_${theme}`];
}
