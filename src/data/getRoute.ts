import { getRouteSegments } from "./getRouteSegments.js";

const routeReducer = (acc: Partial<Route>, seg: string): Partial<Route> => {
  const segInfo = getRouteSegments(seg, acc.segments?.length ?? 0);
  if (typeof segInfo === "undefined") {
    return acc;
  }
  const { routeSegment, pathSegment, variableName } = segInfo;

  const variables: Partial<VariableMap> = variableName
    ? { [variableName]: pathSegment }
    : {};
  const { to = "/", route = "/", segments = [], ...prevVariables } = acc;
  return {
    ...prevVariables,
    ...variables,
    route:
      route === "/" ? `${route}${routeSegment}` : `${route}/${routeSegment}`,
    to: to === "/" ? `${to}${pathSegment}` : `${to}/${pathSegment}`,
    segments: segments.length ? [...segments, pathSegment] : [pathSegment],
  };
};

export const getRoute = <P extends string>(anyPath: P) => {
  const [withoutHash, hash = ""] = anyPath.split("#", 2);
  const {
    route = "/",
    to = "/",
    segments = [],
    ...variables
  } = withoutHash
    .split("/")
    .reduce(routeReducer, {} as Parameters<typeof routeReducer>[0]);
  return {
    route,
    to,
    segments,
    hash,
    ...variables,
  };
};
