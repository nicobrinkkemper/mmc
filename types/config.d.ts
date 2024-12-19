declare global {
  type ThemeConfigValue = Constants["themeConfig"];
  type ThemeConfigKey = keyof ThemeConfigValue;
  type ThemeConfigTheme = ThemeConfigKey extends `_${infer P}` ? P : never;
  type ThemeConfigKeys = ThemeConfigKey[];

  type ThemeConfigRecord = {
    [K in keyof ThemeConfigValue[ThemeConfigKey]]: ThemeConfigValue[ThemeConfigKey][K];
  };
}

export {};
