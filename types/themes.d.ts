declare global {
  type Themes = typeof import("../src/data/themes.json");

  // generally prefer the config keys, as those are the ones used before this is generated
  type ThemeKeys = (keyof Themes)[];

  type Theme = ThemeKeys[number];

  type ThemeImages<T extends Theme = Theme> = Themes[T]["images"]; // if this breaks, can be replaced with ImageJsonStructure for simpler type

  type Level<T extends Theme = Theme> =
    Themes[T]["batches"][0]["levels"][number];

  type Batch<T extends Theme = Theme> = Themes[T]["batches"][number];

  type WeekTrailers<T extends Theme = Theme> = Themes[T]["weektrailers"]; // in case this breaks use string[]

  type Images = Record<
    ThemeConfigTheme,
    Record<"level" | "maker" | "images", ImageJsonStructure>
  >;

  type ThemeMarkdown<T extends Theme = Theme> =
    | Themes[T]["batches"][number]["levels"][number]["description"]
    | Themes[T]["batches"][number]["levels"][number]["makerDescription"];
}
export {};

