import { pageNesting } from "../page/pageNesting.js";

export const getRouteSegments = (
  seg: string,
  nestedLevel: number
): RouteSegment | undefined => {
  if (!(nestedLevel in pageNesting)) return undefined;
  const mapLevel = pageNesting[nestedLevel as keyof typeof pageNesting];

  const result = Object.entries(mapLevel).find(([_, guard]) => guard(seg));
  if (!result) return undefined;
  const variableName = result[0].startsWith("$")
    ? (result[0].slice(1) as keyof VariableMap)
    : false;
  const [routeSegment] = result;
  return {
    variableName: variableName,
    routeSegment: variableName ? ":" + variableName : routeSegment,
    pathSegment: variableName ? seg : routeSegment,
  } as RouteSegment;
};
