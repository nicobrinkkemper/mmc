declare global {
  type Themes = typeof import("../src/data/themes.json");
  type ThemeKeys = (keyof Themes)[];
  type Theme = ThemeKeys[number];

  type ThemeImages = Themes[Theme]["images"];
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
