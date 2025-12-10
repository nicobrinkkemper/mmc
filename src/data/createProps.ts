import { getRouteValidator } from "./getRouteValidator.js";
import { getStaticData } from "./getStaticData.js";
import { getThemePathInfo } from "./getThemePathInfo.js";

export const createProps: CreatePropsFn = (route, options, fn) => {
  const validator = getRouteValidator(route);
  // add default props to options
  options.title = true;
  options.description = true;
  options.image = true;
  options.tags = true;
  options.url = true;
  options.contentType = true;
  options.category = true;
  options.twitter = true;
  return async (to = route) => {
    to = to.replace(/index\.[^.]+$/, "");
    const pathInfo = getThemePathInfo(to) as ThemePathInfo<
      typeof route,
      PathMap[typeof route]
    >;
    if (!options) {
      console.warn(
        "No options provided, this will return the json directly, will not provide computed values"
      );
    }
    const data = await getStaticData<
      typeof route,
      ThemePathInfo<typeof route>,
      ThemeDataOptions<ValidRoute>
    >(pathInfo, options);
    const returned = fn(data as any);
    if (!returned || typeof returned !== "object") return data;
    return {
      ...data,
      ...returned,
    } as any;
  };
};

export const createPropsAsync: CreatePropsAsyncFn = (route, options, fn) => {
  const propsFn = createProps(route, options, () => ({}));
  return async (to = route) => {
    const staticProps = await propsFn(to);
    const props = await fn(staticProps);
    return {
      ...staticProps,
      ...(props as any),
    };
  };
};
