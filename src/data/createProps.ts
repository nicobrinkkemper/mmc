import { createHead } from "./createHead.js";
import { getRouteValidator } from "./getRouteValidator.js";
import { getStaticData } from "./getStaticData.js";
import { getThemePathInfo } from "./getThemePathInfo.js";

export const createProps: CreatePropsFn = (route, options, fn) => {
  const validator = getRouteValidator(route);
  const head = createHead(fn);
  return (to) => {
    if (!validator(to)) {
      console.log("validator", to, validator);
    }
    const pathInfo = getThemePathInfo(to);

    return head({
      ...getStaticData(pathInfo as any, options),
      pathInfo,
    });
  };
};
