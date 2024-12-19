declare global {
  type Themes = typeof import("../src/data/themes.json");
  // generally prefer the config keys, as those are the ones used before this is generated
  type ThemeKeys = (keyof Themes)[];
  type Theme = ThemeKeys[number];

  type ThemeImages = Themes[Theme]["images"]; // if this breaks, can be replaced with ImageJsonStructure for simpler type
  type Level = Themes[Theme]["batches"][0]["levels"][number];
  type Batch = Themes[Theme]["batches"][number];

  type Images = Record<
    ThemeConfigTheme,
    Record<"level" | "maker" | "images", ImageJsonStructure>
  >;

  type ThemeMarkdown =
    | Themes[Theme]["batches"][number]["levels"][number]["description"]
    | Themes[Theme]["batches"][number]["levels"][number]["makerDescription"];
}
export {};

