declare global {
  type WithOption<T> = T | true | undefined;

  type ThemeExists =
    | {
        exists: true;
        theme: ThemePropsReturn<Theme, { pathInfo: true; images: true }>;
      }
    | {
        exists: false;
        theme?: never;
      };

  type LevelExists<L extends ThemeLevel | Level = ThemeLevel> =
    | {
        exists: true;
        level: L;
      }
    | {
        exists: false;
        level?: never;
      };

  type BatchExists<B extends ThemeBatch | Batch = ThemeBatch> =
    | {
        exists: true;
        batch: B;
      }
    | {
        exists: false;
        batch?: never;
      };

  type ThemePropsNextAndPrevLevel = {
    nextLevel: LevelExists;
    prevLevel: LevelExists;
  };

  type ThemePropsNextAndPrevBatch = {
    nextBatch: BatchExists;
    prevBatch: BatchExists;
  };

  type ThemePropsNextAndPrev = {
    nextTheme: ThemeExists;
    prevTheme: ThemeExists;
  };

  interface ThemeDataOptions {
    batches?: WithOption<ThemeBatches>;
    pathInfo?: WithOption<ThemePathInfo> | string;
    info?: WithOption<ThemeInfo>;
    images?: WithOption<ThemeImages>;
    weekTrailers?: WithOption<string[]>;
    nextAndPrevTheme?: WithOption<ThemePropsNextAndPrev>;
    batch?: WithOption<ThemeBatch> | number | string;
    level?: WithOption<ThemeLevel> | number | string;
    error?: WithOption<Error> | string;
  }

  type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  type ThemeProps<T extends ThemeDataOptions> = UnionToIntersection<
    {
      [K in keyof T]: T[K] extends true | string
        ? K extends "batch"
          ? { batch: ThemeBatch; nextAndPrevBatch: ThemePropsNextAndPrevBatch }
          : K extends "level"
          ? { level: ThemeLevel; nextAndPrevLevel: ThemePropsNextAndPrevLevel }
          : K extends "pathInfo"
          ? T[K] extends string
            ? { pathInfo: ThemePathInfo<Theme, T[K]> }
            : { pathInfo: ThemePathInfo }
          : K extends "nextAndPrevTheme"
          ? { nextAndPrevTheme: ThemePropsNextAndPrev }
          : K extends "images"
          ? { images: ThemeImages }
          : K extends "batches"
          ? { batches: ThemeBatch[] }
          : K extends "weekTrailers"
          ? { weekTrailers: string[] }
          : K extends "info"
          ? { info: ThemeInfo }
          : K extends keyof ThemeDataOptions
          ? NonNullable<ThemeDataOptions[K]>
          : never
        : never;
    }[keyof T]
  >;

  type ThemePropsReturn<
    T extends Theme = Theme,
    Options extends ThemeDataOptions = {}
  > = {
    theme: T;
  } & ThemeProps<Options>;

  type GetThemePropsFn = <
    T extends Theme = Theme,
    Options extends ThemeDataOptions = {}
  >(
    theme: T,
    options?: Options
  ) => ThemePropsReturn<T, Options>;

  type UseThemeFn = <
    T extends Theme = Theme,
    Options extends ThemeDataOptions = {}
  >(
    options?: Options
  ) => ThemePropsReturn<T, Options>;
}

export {};
