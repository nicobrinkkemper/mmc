declare global {
  type WithOption<T> = T | true | undefined;

  type ThemeExists<T extends Theme = Theme> =
    | {
        exists: true;
        theme: ThemeStaticData<`/${T}`>;
      }
    | {
        exists: false;
        theme?: never;
      };

  type LevelExists<
    P extends `/${T}/level/${B}/${O}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam,
    L extends ThemeLevel<P, T, B, O> = ThemeLevel<P, T, B, O>
  > =
    | {
        exists: true;
        level: L extends ThemeLevel<P, T, B, O>
          ? ThemeLevel<P, T, B, O>
          : Level;
      }
    | {
        exists: false;
        level?: never;
      };

  type BatchExists<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam
  > =
    | {
        exists: true;
        batch: B extends ThemeBatch<`/${T}/levels/${B}`, T, B>
          ? ThemeBatch<`/${T}/levels/${B}`, T, B>
          : Batch;
      }
    | {
        exists: false;
        batch?: never;
      };

  type ThemePropsNextAndPrevLevel<
    P extends `/${T}/level/${B}/${O}`,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam,
    L extends ThemeLevel<P, T, B, O> = ThemeLevel<P, T, B, O>
  > = {
    nextLevel: LevelExists<P, T, B, O, L>;
    prevLevel: LevelExists<P, T, B, O, L>;
  };

  type ThemePropsNextAndPrevBatch<
    T extends Theme = Theme,
    B extends NumberParam = NumberParam
  > = {
    nextBatch: BatchExists<T, B>;
    prevBatch: BatchExists<T, B>;
  };

  type ThemePropsNextAndPrev = {
    nextTheme: ThemeExists;
    prevTheme: ThemeExists;
  };

  interface ThemeDataOptions<
    P extends ValidPath = ValidPath,
    T extends Theme = Theme,
    B extends NumberParam = NumberParam,
    O extends NumberParam = NumberParam
  > {
    batches?: WithOption<ThemeBatches>;
    pathInfo?: WithOption<ThemePathInfo> | string;
    info?: WithOption<ThemeInfo>;
    images?: WithOption<ThemeImages>;
    weekTrailers?: WithOption<string[]>;
    nextAndPrevTheme?: WithOption<ThemePropsNextAndPrev>;
    batch?: P extends `/${T}/levels/${B}`
      ? WithOption<ThemeBatch<P, T, B>>
      : never;
    level?: P extends `/${T}/level/${B}/${O}`
      ? WithOption<ThemeLevel<P, T, B, O>>
      : never;
    error?: WithOption<Error> | string;
  }
}

export {};

