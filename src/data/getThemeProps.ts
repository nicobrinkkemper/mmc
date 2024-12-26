import { analyzePath } from "./analysePath.js";
import { createThemeDataGetter } from "./createThemeDataGetter.js";
import { routes } from "./routes.js";

const getInfo = createThemeDataGetter("info", "No info found for theme");
const getPathInfo = createThemeDataGetter(
  "pathInfo",
  "No pathInfo found for theme"
);
const getImages = createThemeDataGetter("images", "No images found for theme");
const getLevelData = createThemeDataGetter(
  "levelData",
  "No levelData found for theme"
);
const getWeekTrailers = createThemeDataGetter(
  "weekTrailers",
  "No weekTrailers found for theme"
);
const getAdjacent = createThemeDataGetter(
  "adjacent",
  "No adjacent found for theme"
);

export const getThemeProps = <
  P extends ValidPath,
  O extends ThemeDataOptions = {
    pathInfo: true;
    images: true;
    batches: true;
    weekTrailers: true;
    adjacent: true;
    levelData: true;
  }
>(
  path: P,
  opts: O = {
    pathInfo: true,
    images: true,
    batches: true,
    weekTrailers: true,
    adjacent: true,
    levelData: true,
  } as never
) => {
  const matchingRoute = routes.find((route) => route.path === path);

  if (!matchingRoute) {
    const pathInfo = analyzePath(path);
    const didYouMean = routes.toSorted(
      (a, b) =>
        // find a route with the most segments in common
        a.staticData.pathInfo.segments.reduce(
          (acc, segment) =>
            acc +
            b.staticData.pathInfo.segments.filter((s) => s === segment).length,
          0
        ) -
        b.staticData.pathInfo.segments.reduce(
          (acc, segment) =>
            acc +
            a.staticData.pathInfo.segments.filter((s) => s === segment).length,
          0
        )
    )[0]?.path;
    throw new Error(
      `No route found for theme: ${pathInfo.theme}, path: ${pathInfo.path}, did you mean: ${didYouMean}?`
    );
  }

  return {
    ...getInfo(opts, matchingRoute.staticData),
    ...getPathInfo(opts, matchingRoute.staticData),
    ...getImages(opts, matchingRoute.staticData),
    ...getLevelData(opts, matchingRoute.staticData),
    ...getWeekTrailers(opts, matchingRoute.staticData),
    ...getAdjacent(opts, matchingRoute.staticData),
  };
};
