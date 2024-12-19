declare global {
  type ThemeBaseProps = {
    theme: Theme;
  };

  type ThemeLevel = Omit<Level, "order"> & {
    order: number;
    orderIndex: number;
    isUnreleased: boolean;
    pathInfo: ThemeLevelPathInfo;
    nextAndPrev: ThemePropsNextAndPrevLevel;
  };
  type ThemeLevelPathInfo = {
    pathname: string;
    to: string;
    orderParam: string;
    batchNumberParam: string;
  };
  type ThemeBatch = Omit<Batch, "levels" | "batchNumber"> & {
    weekTrailer: string;
    batchNumber: number;
    batchNumberIndex: number;
    levels: ThemeLevel[];
    pathInfo: ThemeBatchPathInfo;
    nextAndPrev: ThemePropsNextAndPrevBatch;
  };
  type ThemeBatchPathInfo = {
    pathname: string;
    to: string;
    batchNumberParam: string;
  };

  type ThemeBatches = {
    batches: ThemeBatch[];
    isUnreleased: boolean;
    startDate: Date;
  };

  type ThemeInfo = {
    slug: string;
    caps: string;
    snake: string;
    ordinal: number;
    themeYear: string;
    writtenOutOrdinal: string;
    writtenOut: string;
  };

  type ThemePathInfo<
    T extends Theme = Theme,
    Path extends string = string
  > = Path extends `/`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: `/`;
        to: `/${T}/`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: true;
        isHome: true;
        isLevel: false;
        isBatch: false;
        isBatches: false;
        isCredits: false;
        isNotFound: false;
        params: {};
      }
    : Path extends `/level/${string | number}/${string | number}`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: Path;
        to: `/${T}${Path}`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: false;
        isHome: false;
        isLevel: true;
        isBatch: false;
        isBatches: false;
        isCredits: false;
        isNotFound: false;
        params: {
          order: string | number;
          batchNumber: string | number;
        };
      }
    : Path extends `/levels/${string | number}`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: Path;
        to: `/${T}${Path}`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: false;
        isHome: false;
        isLevel: false;
        isBatch: true;
        isBatches: false;
        isCredits: false;
        isNotFound: false;
        params: {
          batchNumber: string | number;
        };
      }
    : Path extends `/levels`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: Path;
        to: `/${T}${Path}`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: false;
        isHome: false;
        isLevel: false;
        isBatch: false;
        isBatches: true;
        isCredits: false;
        isNotFound: false;
        params: {};
      }
    : Path extends `/credits`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: Path;
        to: `/${T}${Path}`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: false;
        isHome: false;
        isLevel: false;
        isBatch: false;
        isBatches: false;
        isCredits: true;
        isNotFound: false;
        params: {};
      }
    : Path extends `/404`
    ? {
        theme: T;
        themeSlug: `/${T}`;
        path: Path;
        to: `/${T}${Path}`;
        toLevels: `/${T}/levels`;
        toCredits: `/${T}/credits`;
        isMainTheme: false;
        isHome: false;
        isLevel: false;
        isBatch: false;
        isBatches: false;
        isCredits: false;
        isNotFound: true;
        params: {};
      }
    : {
        theme: Theme;
        themeSlug: string;
        path: string;
        to: string;
        toLevels: string;
        toCredits: string;
        isMainTheme: boolean;
        isHome: boolean;
        isLevel: boolean;
        isBatch: boolean;
        isBatches: boolean;
        isCredits: boolean;
        isNotFound: boolean;
        params: Record<string, string | number | undefined>;
      };

  type GetThemePathInfoFn = <T extends Theme, Path extends string = `/${T}`>(
    theme: T,
    path?: Path
  ) => ThemePathInfo<T, Path>;
}

export {};
