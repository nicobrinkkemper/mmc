declare global {
  type GeneratedThemes = typeof import("../src/data/generated/themes.js");
  type IsGeneratedThemes = `${keyof GeneratedThemes}` extends `` ? true : false;

  type ThemeConfiguration = typeof import("../src/config/themeConfig.ts");
  type MainTheme = ThemeConfiguration["mainTheme"];
  type ThemeConfigValue = ThemeConfiguration["themeConfig"][number];
  type ThemeConfigKey = ThemeConfigValue["key"];

  type Theme = ThemeConfigValue["theme"];
  type Themes = UnionToTuple<Theme>;
  type ThemeKeys = UnionToTuple<ThemeConfigKey>;
  type ThemeIndex<T extends Theme> = TupleIndex<Themes, T>;

  /**
   * Gets the theme config for a given theme. Using the ThemeIndex helper, we can just get it from the tuple directly.
   */
  type ThemeConfig<T extends Theme = Theme> =
    ThemeConfiguration["themeConfig"][ThemeIndex<T>];
}
export { };

