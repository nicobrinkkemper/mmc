import * as themes from "./generated/themes.js";

export function getTheme<T extends Theme = Theme>(theme: T | string) {
  if (!themes || typeof themes !== "object" || !(`_${theme}` in themes)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  return themes[`_${theme}` as keyof typeof themes];
}
