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
    throw new Error(`The ${route} did not start with a slash, please fix it`);
  }
  if (routeSegments.length === 0) {
    throw new Error(`The ${route} did not have any segments, please fix it`);
  }
  const nestedLevels = routeSegments.length;
  for (let i = 0; i < nestedLevels; i++) {
    const nested = pageNesting[i as keyof typeof pageNesting];
    if (!nested) {
      throw new Error(
        `Please specify a valid route segment in pageNesting.ts at level ${i} for route ${route}`
      );
    }
    const variableName = routeSegments[i].startsWith(":")
      ? (routeSegments[i].slice(1) as keyof VariableMap)
      : false;
    const key = variableName ? `$${variableName}` : routeSegments[i];
    const guard = nested[key as never];
    if (!guard) {
      throw new Error(
        `Please specify a valid route segment in pageNesting.ts at level ${i}.\"${key}\" for route ${route}`
      );
    }
  }
}

export const getRouteValidator = (route: string) => {
  if (!route.includes(":")) {
    return (to: string) => to === route;
  }
  assertRouteString(route);
  return (to: string) => getRoute(to).route === route;
};
