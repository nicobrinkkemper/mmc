declare global {
  type ThemeConfigValue = Constants["themeConfig"];
  type ThemeConfigKey = keyof ThemeConfigValue;
  type ThemeConfigKeys = ThemeConfigKey[];

  type ThemeConfigRecord = {
    [K in keyof ThemeConfigValue[ThemeConfigKey]]: ThemeConfigValue[ThemeConfigKey][K];
  };

  export type ThemeConfig = {
    theme: Theme;
    key: ThemeConfigKey;
    weekTrailers: string[];
    googleSheet: {
      gid: number;
      link: string;
    };
  };

}

export {};

