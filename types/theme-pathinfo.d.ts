import { credits, levels } from "../src/config/themeConfig.ts";
import { pageNesting } from "../src/page/pageNesting.ts";

declare global {
  /**
   * Feel free to add more navigation link helpers here, you don't need them but you can
   * request them if you need them
   */
  type ThemePathInfoNavigation<T extends Theme = Theme> = {
    toCredits: `/${T}/${typeof credits}`;
    toLevels: `/${T}/${typeof levels}`;
    toHome: `/${T}`;
    toLevel: `/${T}/${typeof levels}/${string}/${string}` | undefined;
    toBatch: `/${T}/${typeof levels}/${string}` | undefined;
    toAbout: `#!/about`;
  };
  /**
   * Use the valid path to try to infer as much as possible. Kind of like a test/sanity check for our project.
   * This is the type that's used throughout the project to get context about where we are in the app.
   */
  type ThemePathInfo<
    R extends string = string,
    T extends ValidPath = ValidPath
  > = {
    path: string;
    segments: string[];
    to: T;
    route: R;
    theme: Theme;
    hash: string;
    search: string;
    params: {
      batchNumber: string;
      order: string;
    };
  } & ThemePathInfoNavigation;

  /**
   * All valid paths based on the exported pages
   */
  type ValidPath = PathMap[keyof PathMap];
  /**
   * All valid routes based on the exported pages
   */
  type ValidRoute = keyof PageMap;

  /**
   * The type of the pageNesting object
   */
  type RouteMapType = typeof pageNesting;

  /**
   * This type includes all the variables that are inferred from the `to` value using the `route` by splitting on `/`
   */
  type Route<
    R extends string = string,
    T extends `/${string}` = `/${string}`
  > = {
    route: R;
    to: T;
    segments: string[];
    hash: string;
  } & Partial<VariableMap>;

  /**
   * The variable name is false if it's not a variable, otherwise it's the variable name
   * This is used to build the final Route object
   */
  type RouteSegment<
    T extends VariableMapKey | FixedRouteKey = VariableMapKey | FixedRouteKey
  > = T extends VariableMapKey
    ? {
        variableName: T;
        routeSegment: `:${T}`;
        pathSegment: VariableMap[T];
      }
    : {
        variableName: false;
        routeSegment: T;
        pathSegment: T;
      };

  /**
   * A helper map to go from `/:theme` (route) to `/${Theme}` (to) type
   */
  type PathMap = {
    [k in keyof PageMap]: TypeReplace<k, Required<Route>>;
  };

  /**
   * Helper type to check if a path segment exists in the path
   */
  type HasSegment<
    P extends string,
    S extends string
  > = P extends `${infer _}${S}${infer __}` ? true : false;

  type RouteNestLevel = keyof RouteMapType;
  // type MaxNestLevel = UnionToTuple<RouteNestLevel>["length"];
  type RoutesMapKeys = KeysOfIntersection<RouteMapType[RouteNestLevel]>;
  // type NestLevelRecursive<N extends number> = N extends 0
  //   ? RoutesMapKeys
  //   : NestLevelRecursive<Subtract1<N>>;

  type ExcludeInternals<K> = K extends keyof any[]
    ? never
    : K extends keyof Number
    ? never
    : K;

  type ThemeSegments = ExcludeInternals<RoutesMapKeys>;

  type NestLevels = {
    [K in ThemeSegments]: IndexOfKey<RouteMapType, K>;
  };

  type AllRouteGuards = {
    [K in ThemeSegments]: NestLevels[K] extends keyof RouteMapType
      ? K extends keyof RouteMapType[NestLevels[K]]
        ? RouteMapType[NestLevels[K]][K]
        : never
      : never;
  };

  type AllRouteGuardTypes = {
    [K in keyof AllRouteGuards]: GuardType<AllRouteGuards[K]>;
  };

  type VariableRouteKey = Extract<keyof AllRouteGuardTypes, `$${string}`>;
  type VariableRouteMapKeys = {
    [K in VariableRouteKey]: K extends keyof AllRouteGuardTypes
      ? [K, AllRouteGuardTypes[K]]
      : never;
  };

  type FixedRouteKey = Exclude<keyof AllRouteGuardTypes, `$${string}`>;
  type FixedRouteMapKeys = UnionToTuple<FixedRouteKey>;
  /**
   * This type collects all the variables from the nesting config in a flat manner,
   * using index lookup to get the type of the Guardtype of the predicate.
   */
  type VariableMapKey = VariableRouteKey extends `$${infer U}` ? U : never;
  type VariableMap = {
    [K in VariableMapKey]: VariableRouteMapKeys[`$${K}`][1];
  };
}

export {};

