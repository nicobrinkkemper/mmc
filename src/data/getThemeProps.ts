import { createThemeDataGetter } from "./createThemeDataGetter.js";
import { getThemePathInfo } from "./getThemePathInfo.js";
import { routes } from "./routes.js";

const getInfo = createThemeDataGetter("info", "No info found for theme");
const getImages = createThemeDataGetter("images", "No images found for theme");
const getBatches = createThemeDataGetter(
  "batches",
  "No batches found for theme"
);
const getWeekTrailers = createThemeDataGetter(
  "weekTrailers",
  "No weekTrailers found for theme"
);
const getNextAndPrev = createThemeDataGetter(
  "nextAndPrevTheme",
  "No navigation found for theme"
);

export const getThemeProps = (theme: Theme, options?: ThemeDataOptions) => {
  const opts = options ?? {};
  const pathInfo =
    opts.pathInfo instanceof Object
      ? opts.pathInfo
      : getThemePathInfo(
          typeof opts.pathInfo === "string" ? opts.pathInfo : "/"
        );

  const matchingRoute = routes.find((route) => route.path === pathInfo.path);

  if (!matchingRoute) {
    const didYouMean = routes.find(
      (route) =>
        route.path.includes(theme) && route.path.includes(pathInfo.path)
    );
    throw new Error(
      `No route found for theme: ${theme}, path: ${
        pathInfo.path
      }, did you mean: ${didYouMean?.path ?? `/${theme}`}?`
    );
  }

  return {
    theme,
    ...(opts.pathInfo ? { pathInfo } : {}),
    ...(getInfo(opts, matchingRoute.staticData) ?? {}),
    ...(getImages(opts, matchingRoute.staticData) ?? {}),
    ...(getBatches(opts, matchingRoute.staticData) ?? {}),
    ...(getWeekTrailers(opts, matchingRoute.staticData) ?? {}),
    ...(getNextAndPrev(opts, matchingRoute.staticData) ?? {}),
  };
};
