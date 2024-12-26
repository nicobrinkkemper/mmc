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

  type ImageJsonItem = Record<string, ImageStructure>;

  type ResizedImages = {
    logo: [ResizedImage];
    logo_small: [ResizedImage];
    logo_simple?: [ResizedImage];
    logo_special?: [ResizedImage];
    illustration: [ResizedImage];
    favicon_512x512: [ResizedImage];
    favicon_192x192: [ResizedImage];
    favicon_64x64: [ResizedImage];
    favicon: [ResizedImage];
  };

  type ResizedLevelImage = Record<580 | 1160 | 110 | 220, [ResizedImage]>;
  type ResizedLevelMakerImage = Record<180 | 360, [ResizedImage]>;

  type ResizedImage = {
    width: number;
    height: number;
    aspectRatio: string;
    srcSet: string;
    placeholder?: string;
    src: string;
    alt?: string;
    className?: string;
  };

  type LevelImages = {
    level: ResizedImage;
    levelThumbnail: ResizedImage;
    maker: ResizedImage;
  };

  type Images = {
    [K in Theme]: {
      images: ResizedImages;
      level: {
        [K in string]: ResizedLevelImage;
      };
      maker: {
        [K in string]: ResizedLevelMakerImage;
      };
    };
  };

  type ImageAssets = {
    [K in Theme]: Record<string, ResizedImage>;
  };

  type ResizeImageStructure = {
    public: Images;
    src: {
      assets: ImageAssets;
    };
  };

  type BasicResizedImages = {
    [K in ResizedImageType]: ResizedImage;
  };

  // these images might exists depending on the theme
  type ResizedImageName = IsGeneratedThemes extends true
    ? // if we have no themes.json, this is the fallback type
      keyof ResizedImages
    : // more accurate type derived from themes.json
      KeysOfIntersection<ResizedImages>;

  // the most basic images are the ones that are always there
  type ResizedImageType = Exclude<ResizedImageName, `${string}_${string}`>;

  // get part behind the underscore
  type ResizedImagePreference<T extends string> =
    T extends `${string}_${infer U}` ? U : never;
}
export {};
