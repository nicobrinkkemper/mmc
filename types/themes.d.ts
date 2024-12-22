declare global {
  type ThemesRaw = typeof import("../src/data/themes.json");
  type StubTheme = {
    [key: string]: any;
  };
  type Themes = `${keyof ThemesRaw}` extends `` ? StubTheme : ThemesRaw;

  // generally prefer the config keys, as those are the ones used before this is generated
  type ThemeKeys = (keyof Themes)[];

  type Theme = ThemeConfigKey extends `_${infer P}` ? P : MainTheme;

  type ThemeImages<T extends Theme = Theme> = T extends keyof Themes
    ? Themes[T]["images"]
    : ImageJsonStructure; // if this breaks, can be replaced with ImageJsonStructure for simpler type

  type Level<T extends Theme = Theme> = T extends keyof Themes
    ? Themes[T]["batches"][0]["levels"][number]
    : Record<string, never>;

  type Batch<T extends Theme = Theme> = T extends keyof Themes
    ? Themes[T]["batches"][number]
    : Record<string, never>[];

  type WeekTrailers<T extends Theme = Theme> = T extends keyof Themes
    ? Themes[T]["weektrailers"]
    : string[];

  type Images = Record<
    Theme,
    Record<"level" | "maker" | "images" | "levelThumbnail", ImageJsonStructure>
  >;

  type ThemeMarkdown<T extends Theme = Theme> = T extends keyof Themes
    ?
        | Themes[T]["batches"][number]["levels"][number]["description"]
        | Themes[T]["batches"][number]["levels"][number]["makerDescription"]
    : never;
}
export {};

