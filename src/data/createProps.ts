import { createHead } from "./createHead.js";
import { getStaticData } from "./getStaticData.js";
import { getThemePathInfo, getThemeRouteInfo } from "./getThemePathInfo.js";

export const createProps: CreatePropsFn = (route, options, fn) => {
  const validator = getThemeRouteInfo(route);
  const head = createHead(fn);
  return (to) => {
    if (!validator(to)) {
      console.log("validator", to, validator);
    }
    const pathInfo = getThemePathInfo(to);

    return head({
      ...getStaticData(pathInfo as any, options),
      pathInfo,
    } as any);
  };
};
