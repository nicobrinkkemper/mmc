declare global {
  type logoImageTypes = "logo" | "logo_simple" | "logo_special" | "logo_small";

  type ImageStructure = {
    width: number;
    height: number;
    aspectRatio: string;
    srcSet: string;
    placeholder?: string;
    src: string;
    alt?: string;
    className?: string;
  };

  type ImageJsonStructure = Record<string, ImageStructure>;
  type ImageJsonItem = ImageJsonStructure[string];

  type BasicThemeImages = {
    [K in ThemeImageType]: ThemeImages[K];
  };

  // these images might exists depending on the theme
  type ThemeImageName = KeysOfIntersection<ThemeImages> extends
    | string
    | number
    | symbol
    ? // if we have no themes.json, this is the fallback type
      "logo" | "illustration"
    : // more accurate type derived from themes.json
      KeysOfIntersection<ThemeImages>;

  // the most basic images are the ones that are always there
  type ThemeImageType = Exclude<ThemeImageName, `${string}_${string}`>;

  // get part behind the underscore
  type ThemeImagePreference<T extends string> = T extends `${string}_${infer U}`
    ? U
    : never;
}
export {};

