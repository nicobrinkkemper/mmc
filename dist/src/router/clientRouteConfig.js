import { createRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { routes } from "../data/routes.js";
import { rootRoute } from "./rootRoute.js";
export const clientRouteConfigs = routes.map((route) => {
    const { path, component: Component, staticData } = route;
    return createRoute({
        getParentRoute: () => rootRoute,
        path,
        staticData,
        component: (props) => (React.createElement(Component, { ...staticData, ...props, clickable: Link })),
    });
});
//# sourceMappingURL=clientRouteConfig.js.map