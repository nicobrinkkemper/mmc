declare global {
  type ThemeBaseProps = {
    theme: Theme;
  };

  type ThemeLevel<
    P extends `/${Theme}/level/${string}/${string}` = `/${Theme}/level/${string}/${string}`
  > = Omit<ThemeCsvParseResult, "images" | "pathInfo"> & {
    images: ReturnType<ThemeCsvParseResult["images"]>;
    pathInfo: ReturnType<ThemeCsvParseResult["pathInfo"]>;
    adjacent: Adjacent<
      {
        pathInfo: ThemePathInfo<P>;
        releaseDate: {
          formatted: string;
          date: Date;
          isUnreleased: boolean;
        };
      }[]
    >;
  };

  type ThemeBatch<
    P extends `/${Theme}/levels/${string}` = `/${Theme}/levels/${string}`
  > = WithAdjacent<{
    weekTrailer: string;
    levels: ThemeLevel[];
    pathInfo: ThemePathInfo<P>;
    releaseDate: {
      formatted: string;
      date: Date;
      isUnreleased: boolean;
    };
  }>;

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
  type ValidPath<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam
  > =
    | `/${T}`
    | `/${T}/`
    | `/${T}/credits`
    | `/${T}/levels`
    | `/${T}/levels/${B}`
    | `/${T}/level/${B}/${O}`
    | `/${T}/level/${B}`
    | `/${T}/credits`;

  /**
   * Helper type to check if a path segment exists in the path
   * @template P - The full path string
   * @template S - The segment to check for
   */
  type HasSegment<
    P extends string,
    S extends string
  > = P extends `${infer _}${S}${infer __}` ? true : false;

  type Segments<P extends string> = P extends `${infer Start}/${infer Rest}`
    ? Start extends ""
      ? Segments<Rest>
      : [Start, ...Segments<Rest>]
    : P extends ""
    ? []
    : [P];

  /**
   * Here we repeat the valid path, but we try to infer as much as possible (also for fun, but also because it's kind of like a test) and return it as static types.
   * This ensures that any boolean values are staticly known and not just `true` or `false` based on the path.
   */
  type ThemePathInfo<
    Path extends string,
    Seg extends Segments<Path> = Segments<Path>,
    T extends Theme = Seg[0] extends Theme ? Seg[0] : never
  > = {
    path: string;
    segments: Seg;
    to: Path;
    toCredits: `/${T}/credits`;
    toLevels: `/${T}/levels`;
    toHome: `/${T}`;
    theme: T;
    params: (Seg[3] extends NumberParam ? { order: Seg[3] } : {}) &
      (Seg[2] extends NumberParam ? { batchNumber: Seg[2] } : {});
  };

  type GetThemePathInfoFn = <Path extends ValidPath = ValidPath>(
    path?: Path
  ) => ThemePathInfo<Path>;
}

export {};

