import {
  credits,
  isValidTheme,
  levels,
  mainTheme,
  notfound,
} from "../config/themeConfig.js";

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

const addRoute = <
  PI extends Pick<ThemePathInfo<ValidPath>, "segments" | "to">
>(
  pathInfo: PI
): PI & Pick<ThemePathInfo<ValidPath>, "route" | "params" | "path" | "theme"> => {
  const { segments } = pathInfo;
  let theme: Theme | undefined;
  const params = {
    batchNumber: "",
    order: "",
  };
  const route = segments
    .map((seg, index) => {
      switch (index) {
        case 0:
          if (seg === "") {
            return seg;
          }
          if (seg.startsWith("http")) {
            throw new Error(
              `Did not expect an absolute URL: ${JSON.stringify(pathInfo)}`
            );
          }
          return "";
        case 1:
          if (seg === notfound || seg === "") {
            theme = mainTheme;
            return seg;
          }
          if (!isValidTheme(seg)) {
            throw new Error(`Invalid theme: ${JSON.stringify(pathInfo)}`);
          }
          theme = seg;
          return ":theme";
        case 2:
          return seg;
        case 3:
          params.batchNumber = seg;
          return ":batchNumber";
        case 4:
          params.order = seg;
          return ":order";
        default:
          throw new Error(`Invalid segment: ${seg}`);
      }
    })
    .join("/");
  if (!theme) throw new Error(`Invalid theme path: ${pathInfo.to}`);
  
  const path = segments[1] === notfound  ? `/${notfound}` : segments[1] === '' ? "/" : '/'+segments.slice(2).join("/");
  
  return { ...pathInfo, route: route as any, params, theme, path: path === '/' ? '' : path };
};


/**
 * Given any url it will return the full path info object
 */
export const getThemePathInfo = <
  const P extends string,
>(
  to: P
) => {
  const pathname = to.startsWith("http")
    ? new URL(to).pathname
    : to.startsWith("/")
        ? to
        : "/" + to
  const segments = pathname.split("/") as Split<P>;
  return addNavigation(addRoute({to: to as ValidPath, segments}));
};

const map = {
  theme: isValidTheme,
  batchNumber: (seg: string) => !isNaN(Number(seg)),
  order: (seg: string) => !isNaN(Number(seg)),
}

// Given /:theme/credits/:batchNumber/:order will return {theme:string, params: {batchNumber:string, order:string}}

/**
 * Given a route, it will return a function that will validate if the given url
 * matches the route and its parameters.
 */
export const getThemeRouteInfo: getThemeRouteInfoFn = (route) => {
  // turn /:theme, etc, any route into a regex
  const regex = new RegExp(`^${route.replace(/:(\w+)/g, "([^/]+)")}$`);
  return (to): to is ThemePathInfo<PathMap[typeof route]> => {
    if(typeof to !== 'string') return false
    try {
      const matches = to.match(regex);
      if (!matches) return false;
  
      // Get parameter names from route
      const params = route.match(/:(\w+)/g)?.map(p => p.slice(1)) || [];
      if (!params.every((param, i) =>
        map[param as keyof typeof map]?.(matches[i + 1])
      )) return false;
      console.log("Matched", matches)

      return true
    } catch (e) {
      console.error(to, e)
      return false
    }
  }
}
