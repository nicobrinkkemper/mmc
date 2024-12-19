import themeKeys from "./themesKeys.json" with { type: "json" };

export const isValidTheme = (
  _theme: unknown
): _theme is ThemeConfigTheme => {
  return themeKeys.includes(_theme as never);
};
