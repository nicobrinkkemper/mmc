declare global {
  type LevelPageType<
    T extends Theme = Theme,
    B extends string = string,
    O extends string = string
  > = ThemePageComponent<
    `/${T}/level/${B}/${O}`,
    {
      images: pickRequired<["logo_simple", "logo"]>;
      level: required;
      batch: required;
      pathInfo: required;
      clickable: required;
    }
  >;

  type LevelBatchPageType<
    T extends Theme = Theme,
    B extends string = string
  > = ThemePageComponent<
    `/${T}/levels/${B}`,
    {
      images: pickRequired<["logo_simple", "logo"]>;
      batch: required;
      pathInfo: required;
      clickable: required;
    }
  >;

  type LevelBatchesPageType<T extends Theme = Theme> = ThemePageComponent<
    `/${T}/levels`,
    {
      images: pickRequired<["logo"]>;
      levelData: required;
      pathInfo: required;
      clickable: required;
      adjacent: {
        pathInfo: pickRequired<["to"]>;
        images: pickRequired<["logo"]>;
      };
    }
  >;

  type CreditsPageType<T extends Theme = Theme> = ThemePageComponent<
    `/${T}/credits`,
    {
      images: pickRequired<["logo"]>;
      pathInfo: required;
      clickable: required;
      adjacent: {
        pathInfo: pickRequired<["to"]>;
        images: pickRequired<["logo"]>;
      };
    }
  >;

  type HomePageType<T extends Theme = Theme> = ThemePageComponent<
    `/${T}`,
    {
      images: pickRequired<["logo_special", "logo", "illustration"]>;
      pathInfo: required;
      clickable: required;
      info: required;
      adjacent: {
        pathInfo: pickRequired<["to"]>;
        images: pickRequired<["logo"]>;
      };
    }
  >;

  type NotFoundPageType = ThemePageComponent<
    `/${MainTheme}`,
    {
      images: pickRequired<["logo"]>;
      pathInfo: required;
      clickable: required;
    }
  >;

  type AnyPage =
    | LevelPageType
    | LevelBatchPageType
    | LevelBatchesPageType
    | HomePageType
    | CreditsPageType;
}

export {};
