import {
  credits,
  isValidTheme,
  levels,
  mainTheme,
  notfound,
} from "../config/themeConfig.js";

const routeMap = {
  0: {
    $theme: (theme: string): theme is Theme => isValidTheme(theme),
    "404": (seg: string): seg is string => seg === notfound,
  },
  1: {
    credits: (seg: string): seg is typeof credits => seg === credits,
    levels: (seg: string): seg is typeof levels => seg === levels,
  },
  2: {
    $batchNumber: (seg: string): seg is string => !isNaN(Number(seg)),
  },
  3: {
    $order: (seg: string): seg is string => !isNaN(Number(seg)),
  },
};
type RouteMapType = typeof routeMap;
type RouteNestLevel = keyof RouteMapType;
// type MaxNestLevel = UnionToTuple<RouteNestLevel>["length"];
type RoutesMapKeys = KeysOfIntersection<RouteMapType[RouteNestLevel]>;
// type NestLevelRecursive<N extends number> = N extends 0
//   ? RoutesMapKeys
//   : NestLevelRecursive<Subtract1<N>>;

type VariableRouteMapKeys = {
  [K in RoutesMapKeys as K extends `$${infer V}` ? V : never]: string;
};

const addNavigation = <
  P extends ValidPath,
  PI extends Pick<ThemePathInfo<P>, "theme" | "params">
>(
  pathInfo: PI
): PI &
  Pick<
    ThemePathInfo<P>,
    "toHome" | "toLevels" | "toCredits" | "toLevel" | "toBatch"
  > => {
  return {
    ...pathInfo,
    toHome: `/${pathInfo.theme}` as const,
    toLevels: `/${pathInfo.theme}/${levels}` as const,
    toCredits: `/${pathInfo.theme}/${credits}` as const,
    toLevel: (pathInfo.params.order !== "" && pathInfo.params.batchNumber !== ""
      ? `/${pathInfo.theme}/${levels}/${pathInfo.params.batchNumber}/${pathInfo.params.order}`
      : undefined) as ThemePathInfo<P>["toLevel"],
    toBatch: (pathInfo.params.batchNumber !== ""
      ? `/${pathInfo.theme}/${levels}/${pathInfo.params.batchNumber}`
      : undefined) as ThemePathInfo<P>["toBatch"],
  };
};

const getRouteSegments = (
  seg: string,
  nestedLevel: number
):
  | undefined
  | {
      routeSegment: string;
      pathSegment: string;
      variableName: false | keyof VariableRouteMapKeys;
    } => {
  if (!(nestedLevel in routeMap)) return undefined;
  const mapLevel = routeMap[nestedLevel as keyof typeof routeMap];

  const result = Object.entries(mapLevel).find(([_, guard]) => guard(seg));
  if (!result) return undefined;
  const variableName = result[0].startsWith("$")
    ? (result[0].slice(1) as keyof VariableRouteMapKeys)
    : false;
  const [routeSegment] = result;
  return {
    variableName: variableName,
    routeSegment: variableName ? ":" + routeSegment.slice(1) : routeSegment,
    pathSegment: variableName ? seg : routeSegment,
  };
};

const getRoute = <P extends string>(anyPath: P) => {
  const result = {
    route: "",
    to: "",
    segments: [],
  } as {
    route: string;
    to: string;
    segments: string[];
  } & {
    [K in keyof VariableRouteMapKeys]?: string;
  };

  return anyPath.split("/").reduce<typeof result>((acc, seg) => {
    const segInfo = getRouteSegments(seg, acc.segments.length);
    if (typeof segInfo === "undefined") {
      return acc;
    }
    const { routeSegment, pathSegment, variableName } = segInfo;
    const variables = variableName
      ? {
          [variableName]: pathSegment,
        }
      : null;
    const { to, route, segments, ...prevVariables } = acc;
    return {
      ...prevVariables,
      ...variables,
      route: route !== "" ? route + "/" + routeSegment : "/" + routeSegment,
      to: to !== "" ? to + "/" + pathSegment : "/" + pathSegment,
      segments: segments.length
        ? [...acc.segments, pathSegment]
        : [pathSegment],
    };
  }, result);
};

/**
 * Given any url it will return the full path info object
 */
export const getThemePathInfo = <P extends string>(anyPath: P) => {
  const {
    route,
    to,
    theme = mainTheme,
    batchNumber = "",
    order = "",
  } = getRoute(anyPath);

  const path = to.includes(theme)
    ? `${to}`.replace(`/${theme}/`, "/").replace(`/${theme}`, "/")
    : to;

  return addNavigation({
    route: route === "" ? "/" : route,
    to: to === "" ? "/" : to,
    theme: theme as Theme,
    path: path === "" ? "/" : path,
    params: {
      batchNumber: batchNumber === "" ? "" : batchNumber,
      order: order === "" ? "" : order,
    },
  });
};

// Given /:theme/credits/:batchNumber/:order will return {theme:string, params: {batchNumber:string, order:string}}

/**
 * Given a route, it will return a function that will validate if the given url
 * matches the route and its parameters.
 */
export const getThemeRouteInfo: getThemeRouteInfoFn = (route) => {
  return (to) => {
    try {
      if (typeof to !== "string")
        throw new Error(`Invalid path: ${JSON.stringify(to)}`);
      const pathInfo = getThemePathInfo(to);
      if (pathInfo.route === route) {
        return pathInfo;
      }
      return null;
    } catch (e) {
      console.error(to, e);
      return null;
    }
  };
};

/**
 * Given a route, it will return a function that will validate if the given url
 * matches the route and its parameters.
 */
export const isThemeRoute: isThemeRouteFn = (route) => {
  // turn /:theme, etc, any route into a regex
  const getter = getThemeRouteInfo(route);
  return (to): to is ThemePathInfo<PathMap[typeof route]> => !!getter(to);
};
