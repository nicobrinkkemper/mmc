declare global {
  type ThemeBaseProps = {
    theme: Theme;
  };

  type ThemeLevel<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam,
    P extends `/${T}/level/${B}/${O}` = `/${T}/level/${B}/${O}`
  > = Omit<Level, "order"> & {
    order: string;
    orderIndex: number;
    isUnreleased: boolean;
    pathInfo: ThemeLevelPathInfo<T, B, O, P>;
    nextAndPrev: ThemePropsNextAndPrevLevel;
  };

  type ThemeLevelPathInfo<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam,
    P extends `/${T}/level/${B}/${O}` = `/${T}/level/${B}/${O}`
  > = {
    pathname: `/level/${B}/${O}`;
    to: P;
    isLevel: true;
    params: {
      order: B;
      batchNumber: O;
    };
  };

  type ThemeBatch<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    P extends `/${T}/levels/${B}` = `/${T}/levels/${B}`
  > = Omit<Batch, "levels" | "batchNumber"> & {
    weekTrailer: string;
    batchNumber: Themes[Theme]["batches"][number]["batchNumber"];
    batchNumberIndex: number;
    levels: ThemeLevel<T, B>[];
    pathInfo: ThemeBatchPathInfo<T, B, P>;
    nextAndPrev: ThemePropsNextAndPrevBatch;
  };

  type ThemeBatchPathInfo<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    P extends `/${T}/levels/${B}` = `/${T}/levels/${B}`
  > = {
    pathname: `/levels/${B}`;
    to: P;
    isBatch: true;
    params: {
      order?: never;
      batchNumber: B;
    };
  };

  type ThemeBatchesPathInfo<
    P extends `/${T}/levels`,
    T extends Theme = Theme
  > = {
    pathname: `/levels`;
    to: P;
    params?: never;
    isBatches: true;
  };

  type ThemeBatchesPathInfoFn = <
    P extends `/${T}/levels`,
    T extends Theme = Theme
  >(
    pathInfo: Pick<ThemePathInfo<P>, "themeSlug">
  ) => ThemeBatchesPathInfo<P>;

  type ThemeBatches<T extends Theme = Theme> = {
    batches: ThemeBatch<T>[];
    isUnreleased: boolean;
    startDate: Date;
  };

  type ThemeInfo<T extends Theme = Theme> = {
    slug: string;
    caps: Uppercase<T>;
    snake: string;
    ordinal: number;
    // totally useless but fun way to get the first character of the string
    themeYear: T extends `${infer First}${string}` ? First : never;
    writtenOutOrdinal: string;
    writtenOut: string;
  };

  /**
   * Since the number param is always a string, we can use the string type to represent it.
   */
  type NumberParam = string | number;
  /**
   * Pretty straight forward, though a little repetitive.
   * Simple definition of all possible paths.
   */
  type ValidPath<T extends Theme = Theme> =
    | `/`
    | `/${T}`
    | `/${T}/levels`
    | `/${T}/credits`
    | `/${T}/levels`
    | `/${T}/levels/${NumberParam}`
    | `/${T}/level/${NumberParam}/${NumberParam}`
    | `/${T}/level/${NumberParam}`
    | `/${T}/credits`
    | `/404`;

  /**
   * Here we repeat the valid path, but we try to infer as much as possible (also for fun, but also because it's kind of like a test) and return it as static types.
   * This ensures that any boolean values are staticly known and not just `true` or `false` based on the path.
   */
  type ThemePathInfo<Path extends ValidPath = ValidPath> = Path extends
    | `/`
    | `/${infer U}`
    | `/${infer U}/levels`
    | `/${infer U}/credits`
    | `/${infer U}/levels`
    | `/${infer U}/levels/${infer B extends NumberParam}`
    | `/${infer U}/level/${infer B extends NumberParam}/${infer O extends NumberParam}`
    | `/${infer U}/level/${infer B extends NumberParam}`
    | `/${infer U}/credits`
    | `/404`
    ? {
        theme: U extends Theme ? U : MainTheme;
        isMainTheme: Path extends "/" | "/404"
          ? true
          : U extends MainTheme
          ? true
          : U extends Theme
          ? false
          : boolean;
        isHome: Path extends `/` | `/${U}` ? true : false | undefined;
        isCredits: Path extends `/${U extends Theme ? U : MainTheme}/credits`
          ? true
          : false | undefined;
        isNotFound: Path extends `/404` ? true : false | undefined;
        isLevel: Path extends `/${U extends Theme
          ? U
          : MainTheme}/level/${B}/${O}`
          ? true
          : false | undefined;
        isBatch: Path extends `/${U extends Theme ? U : MainTheme}/levels/${B}`
          ? true
          : false | undefined;
        isBatches: Path extends `/${U extends Theme ? U : MainTheme}/levels`
          ? true
          : false | undefined;
        toCredits: `/${U extends Theme ? U : MainTheme}/credits`;
        toLevels: `/${U extends Theme ? U : MainTheme}/levels`;
        themeSlug: `/${U extends Theme ? U : MainTheme}`;
        to: Path;
        path: Path extends `/${Theme}${infer P}` ? P : "/";
        params: {
          order?: string | undefined;
          batchNumber?: string | undefined;
        };
      }
    : never;

  type GetThemePathInfoFn = <Path extends ValidPath = ValidPath>(
    path?: Path
  ) => ThemePathInfo<Path>;
}

export {};

