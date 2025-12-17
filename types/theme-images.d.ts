declare global {
  type logoImageTypes = "logo" | "logo_simple" | "logo_special" | "logo_small";

  type ImageStructure = {
    readonly width: number;
    readonly height: number;
    readonly aspectRatio: string;
    readonly srcSet: string;
    readonly placeholder?: string;
    readonly src: string;
    readonly alt?: string;
    readonly className?: string;
  };

  type ImageJsonItem = Record<string, ImageStructure>;

  type ResizedImages = {
    readonly logo: ResizedImage;
    readonly logo_small: ResizedImage;
    readonly logo_simple?: ResizedImage;
    readonly logo_simple_small?: ResizedImage;
    readonly logo_special?: ResizedImage;
    readonly illustration: ResizedImage;
    readonly illustration_2: ResizedImage; // TODO generalize or broken ik weet het fucking niet
    readonly favicon_512x512: ResizedImage;
    readonly favicon_192x192: ResizedImage;
    readonly favicon_64x64: ResizedImage;
    readonly favicon: ResizedImage;
  };

  type Favicons = {
    readonly favicon_512x512: string;
    readonly favicon_192x192: string;
    readonly favicon_64x64: string;
    readonly favicon: string;
  };

  type ResizedBatchImage = Readonly<Record<80 | 160, [string]> & ResizedImage>;

  type ResizedLevelImage = Readonly<
    Record<580 | 1160 | 110 | 220, [string]> & ResizedImage
  >;
  type ResizedLevelMakerImage = Readonly<
    Record<180 | 360, [string]> & ResizedImage
  >;

  /**
   * We are not using the placeholder image since I didn't think it looked good,
   * might give it another try later.
   */
  type ResizedImage = Omit<ImageStructure, "placeholder">;

  type LevelImages = {
    readonly level: ResizedImage;
    readonly levelThumbnail: ResizedImage;
    readonly maker: ResizedImage;
  };

  type Images = {
    readonly [K in Theme]: {
      readonly images: ResizedImages;
      readonly level: {
        [K in string]: ResizedLevelImage;
      };
      readonly maker: {
        [K in string]: ResizedLevelMakerImage;
      };
      readonly batch: {
        [K in string]: ResizedBatchImage;
      };
    };
  };

  type ImageAssets = {
    readonly [K in Theme]: Record<string, ResizedImage>;
  };

  type ResizeImageStructure = {
    public: Images;
    readonly src: {
      assets: ImageAssets;
    };
  };

  type BasicResizedImages = {
    [K in ResizedImageType]: ResizedImage;
  };

  // these images might exist depending on the theme
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
export { };

