import { credits, levels } from "../src/config/themeConfig.ts";

declare global {
  type ThemeLevel = ThemeLevelData;

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

  type ThemeInfo<T extends Theme = Theme> = {
    readonly slug: string;
    readonly caps: Uppercase<T>;
    readonly snake: string;
    readonly ordinal: number;
    readonly themeYear: T extends `${infer First}${string}` ? First : never;
    readonly writtenOutOrdinal: string;
    readonly writtenOut: string;
  };

  /**
   * All valid paths based on the exported pages
   */
  type ValidPath = PathMap[keyof PathMap];
  /**
   * All valid routes based on hte exported pages
   */
  type ValidRoute = keyof PageMap;
  type RouteParamMap = {
    theme: Theme;
    path: string;
    to: string;
    params: {
      batchNumber: string;
      order: string;
    };
  };
  type getThemeRouteParamsFn = <R extends ValidRoute>(
    route: R
  ) => (to: string) => RouteParamMap;

  type getThemeRouteInfoFn = <R extends ValidRoute>(
    route: R
  ) => (to: unknown | ThemePathInfo<PathMap[R]>) => RouteParamMap | null;

  type isThemeRouteFn = <R extends ValidRoute>(
    route: R
  ) => (to: unknown) => to is ThemePathInfo<PathMap[R]>;

  /**
   * A helper map to go from `/:theme` (route) to `/${Theme}` (to) type
   */
  type PathMap = {
    [k in keyof PageMap]: TypeReplace<
      k,
      {
        theme: Theme;
        batchNumber: string;
        order: string;
        path: string;
        to: string;
      }
    >;
  };

  /**
   * Helper type to check if a path segment exists in the path
   * @template P - The full path string
   * @template S - The segment to check for
   */
  type HasSegment<
    P extends string,
    S extends string
  > = P extends `${infer _}${S}${infer __}` ? true : false;

  /**
   * Use the valid path to try to infer as much as possible. Kind of like a test/sanity check for our project.
   * This is the type that's used throughout the project to get context about where we are in the app.
   */
  type ThemePathInfo<Path extends ValidPath = ValidPath> = {
    path: string;
    segments: string extends Path ? Split<Path> : string[];
    to: Path;
    route: keyof {
      [K in keyof PathMap as PathMap[K] extends Path ? K : never]: K;
    };
    toCredits: `/${Theme}/${typeof credits}`;
    toLevels: `/${Theme}/${typeof levels}`;
    toHome: `/${Theme}`;
    toLevel: `/${Theme}/${typeof levels}/${string}/${string}` | undefined;
    toBatch: `/${Theme}/${typeof levels}/${string}` | undefined;
    theme: Theme;
    params: {
      batchNumber: string;
      order: string;
    };
  };

  type GetThemePathInfoFn = <Path extends ValidPath = ValidPath>(
    path?: Path
  ) => ThemePathInfo<Path>;
}

export {};

