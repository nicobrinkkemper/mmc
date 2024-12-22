declare global {
  type ThemeBaseProps = {
    theme: Theme;
  };

  type ThemeLevel<
    P extends `/${T}/level/${B}/${O}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam
  > = Omit<Level, "order"> & {
    levelName: {
      name: string;
      slug: string;
    };
    makerName: {
      name: string;
      slug: string;
    };
    images: Record<"level" | "maker" | "levelThumbnail", ImageStructure>;
    levelCode: string;
    makerId: string;
    nationality: string;
    makerDescription: string;
    description: string;
    difficulty: number;
    difficultyName: string;
    tags: string[];
    pathInfo: ThemeLevelPathInfo<P, T, B, O>;
    nextAndPrev: ThemePropsNextAndPrevLevel<P, T, B, O>;
    releaseDate: {
      formatted: string;
      date: Date;
      isUnreleased: boolean;
    };
  };

  type ThemeLevelPathInfo<
    P extends `/${T}/level/${B}/${O}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam
  > = {
    themeSlug: `/${T}`;
    path: [T, "level", B, O];
    to: P;
    isLevel: true;
    params: {
      order: O;
      batchNumber: B;
    };
  };

  type ThemeBatch<
    P extends `/${T}/levels/${B}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam
  > = Omit<Batch, "levels" | "batchNumber"> & {
    weekTrailer: string;
    levels: ThemeLevel<`/${T}/level/${B}/${NumberParam}`>[];
    pathInfo: ThemeBatchPathInfo<P, T, B>;
    nextAndPrev: ThemePropsNextAndPrevBatch<T, B>;
    tags: string[];
    releaseDate: {
      formatted: string;
      date: Date;
      isUnreleased: boolean;
    };
  };

  type BeforeNextAndPrevBatchIsAdded<
    T extends Theme,
    B extends NumberParam
  > = Omit<ThemeBatch<`/${T}/levels/${B}`, T, B>, "nextAndPrev">;

  type ThemeBatchPathInfo<
    P extends `/${T}/levels/${B}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam
  > = {
    themeSlug: `/${T}`;
    path: [T, "levels", B];
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
    batches: ThemeBatch<`/${T}/levels/${NumberParam}`>[];
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
  type NumberParam = string;
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
        isMainTheme: Path extends
          | "/"
          | "/404"
          | `/${U extends Theme ? U : MainTheme}`
          ? true
          : U extends Theme
          ? boolean
          : false;
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

