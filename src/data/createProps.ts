import { assertObject } from "../utils/pickAssert.js";
import { createHead } from "./createHead.js";
import { getRouteValidator } from "./getRouteValidator.js";
import { getStaticData } from "./getStaticData.js";
import { getThemeInfo } from "./getThemeInfo.js";
import { getThemePathInfo } from "./getThemePathInfo.js";

export const createProps: CreatePropsFn = (route, options, fn) => {
  const validator = getRouteValidator(route);
  const head = createHead(fn);
  return async (to = route) => {
    to = to.replace(/index\.[^.]+$/, "");
    if (!validator(to)) {
      console.log(
        `You called the wrong function, the requested path is "${to}" but this props function is for "${route}"`
      );
    }
    const pathInfo = getThemePathInfo(to) as ThemePathInfo<
      typeof route,
      PathMap[typeof route]
    >;
    if (!options) {
      console.warn(
        "No options provided, this will return the json directly, will not provide computed values"
      );
    }
    const data = await getStaticData(pathInfo, options);
    if (!data) {
      return null;
    }
    assertObject(data, ["images"]);
    return head({
      ...data,
      info: getThemeInfo(pathInfo.theme),
      pathInfo,
    } as never);
  };
};
