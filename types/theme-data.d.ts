import React from "react";

declare global {
  /**
   * `ThemeLevel` contains everything known about a level. It's the main type
   * to use when working with level data.
   */
  type ThemeLevel = {
    [K in keyof ThemeLevelData]: ThemeLevelData[K];
  };

  /**
   * `ThemeBatch` contains everything known about a batch. It's the main type
   * to use when working with batch data.
   */
  type ThemeBatch = {
    batchNumber: string;
    batchName: string;
    batchDescription: string;
    weekTrailer: string;
    levels: ThemeLevel[];
    image: ResizedBatchImage | null;
    releaseDate: {
      value: string;
      date: Date;
      isUnreleased: boolean;
    };
  };

  /**
   * `ThemeInfo` contains miscellaneous information about a theme, like the all caps version, ordinal, etc.
   * Feel free to add more as needed, and it should be available using the `info` option.
   */
  type ThemeInfo<T extends Theme = Theme> = {
    readonly slug: string;
    readonly caps: Uppercase<T>;
    readonly snake: string;
    readonly ordinal: number;
    readonly themeYear: T extends `${infer First}${string}` ? First : string;
    readonly writtenOutOrdinal: string;
    readonly writtenOut: string;
  };

  /**
   * `ThemeStaticDataReturn` is the type returned by `getStaticData`
   */
  type ThemeStaticDataReturn<
    R extends ValidRoute = ValidRoute,
    Opt extends ThemeDataOptions = ThemeDataOptions,
    PI extends ThemePathInfo<R> = ThemePathInfo<R>
  > = {
    [K in keyof ThemeDataMapping<R, PI> as WithOption<
      Opt[K extends keyof Opt ? K : never],
      ThemeDataMapping<R, PI>[K]
    > extends never
      ? never
      : K extends keyof ThemeDataMapping<R, PI>
      ? K
      : never]: WithOption<
      Opt[K extends keyof Opt ? K : never],
      ThemeDataMapping<R, PI>[K]
    >;
  };

  /**
   * `ThemeUtil` is the main type to use when creating new utilities for the theme. Anything that isn't a React component.
   */
  type ThemeUtil<
    R extends ValidRoute,
    Opt extends ThemeDataOptions = ThemeDataOptions,
    Custom = Record<never, never>,
    Return = any
  > = (props: ThemeStaticDataReturn<R, Opt> & Custom) => Return;

  /**
   * Helper to create a page aware component for a theme
   * @example
   * ```tsx
   * const CreditsPage: ThemePageComponent<"/4ymm/credits"> = ({ pathInfo, images, adjacent, clickable }) => {
   *   return <div>Credits</div>;
   * };
   * ```
   */
  type ThemePageComponent<
    R extends ValidRoute,
    Props extends ReturnType<PageMap[R]["props"]> = ReturnType<
      PageMap[R]["props"]
    >,
    As extends keyof React.JSX.IntrinsicElements = "div"
  > = (props: Props & React.JSX.IntrinsicElements[As]) => React.ReactNode;

  type AsProperty = React.ElementType;
  /**
   * The As property might not be implemented at every component level, but
   * each component can have the `as` property to override the default element.
   *
   * It can also be a full fledged component. When it's a client component,
   * it will trigger the client boundary as expected - until it's rendered.
   *
   * Lastly, the "" string can be used as a shortcut for the default React.Fragment component.
   */
  type WithAsProperty<As extends AsProperty> = (As extends ""
    ? React.ComponentProps<typeof React.Fragment>
    : As extends keyof React.JSX.IntrinsicElements
    ? React.JSX.IntrinsicElements[As]
    : {}) & { as?: As };

  /**
   * Helper to create a component for a theme.
   * @example
   * ```tsx
   * const App: ThemeComponent = ({ pathInfo, images, clickable }) => {
   *   return <div>App</div>;
   * };
   * ```
   */
  type ThemeComponent<
    Opt extends ThemeDataOptions = {
      pathInfo: true;
    },
    As extends AsProperty = "div",
    Custom extends Record<string, unknown> = Record<never, never>
  > = ThemeUtil<ValidRoute, Opt, WithAsProperty<As> & Custom, React.ReactNode>;

  /**
   * `GetStaticDataFn` is used for `getStaticData`, cntr+click on any type to see it.
   */
  type GetStaticDataFn = <
    R extends ValidRoute,
    PI extends ThemePathInfo<R>,
    Opt extends ThemeDataOptions
  >(
    pathInfo: PI,
    options?: Opt
  ) => Promise<ThemeStaticDataReturn<R, Opt> & PI>;
}

export {};

