import { clientRouteConfigs } from "./clientRouteConfig.js";
import { rootRoute } from "./rootRoute.js";

export const routeTree = rootRoute.addChildren(clientRouteConfigs);
