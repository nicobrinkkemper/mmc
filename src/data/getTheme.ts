import themes from "./themes.json" with { type: "json" };

export function getTheme<T extends Theme = Theme>(
  theme: T | string
): T extends keyof GeneratedThemes
  ? GeneratedThemes[T]
  : any {
  if (!themes || typeof themes !== "object" || !(theme in themes)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  return themes[theme as keyof typeof themes]
}
