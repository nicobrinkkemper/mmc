import { pageNesting } from "../page/pageNesting.js";
import { getRoute } from "./getRoute.js";

function assertRouteString(
  route: string | ValidRoute
): asserts route is ValidRoute {
  if (route === "/") {
    return;
  }
  const [first, ...routeSegments] = route.split("/");
  if (first !== "") {
    console.warn(`The ${route} did not start with a slash, please fix it`);
    return;
  }
  if (routeSegments.length === 0) {
    console.warn(`The ${route} did not have any segments, please fix it`);
    return;
  }
  const nestedLevels = routeSegments.length;
  for (let i = 0; i < nestedLevels; i++) {
    const nested = pageNesting[i as keyof typeof pageNesting];
    if (!nested) {
      console.warn(
        `Please specify a valid route segment in pageNesting.ts at level ${i} for route ${route}`
      );
      return;
    }
    const variableName = routeSegments[i].startsWith(":")
      ? (routeSegments[i].slice(1) as keyof VariableMap)
      : false;
    const key = variableName ? `$${variableName}` : routeSegments[i];
    const guard = nested[key as never];
    if (!guard) {
      console.warn(
        `Please specify a valid route segment in pageNesting.ts at level ${i}.\"${key}\" for route ${route}`
      );
      return;
    }
  }
}

export const getRouteValidator = (route: string) => {
  if (!route.includes(":")) {
    return (to: string) => to === route;
  }
  assertRouteString(route);
  return (to: string) => {
    const result = getRoute(to);
    return result.route === route;
  };
};
