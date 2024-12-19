import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { mainTheme } from "../config/constants.js";
import { getThemeProps } from "../data/getThemeProps.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";
export const rootRoute = createRootRoute({
    component: () => {
        return React.createElement(Outlet, null);
    },
    notFoundComponent: () => (React.createElement(NotFoundPageStatic, { clickable: Link, ...getThemeProps(mainTheme, {
            pathInfo: "/404",
            info: true,
            images: true,
            withLevelData: true,
        }) })),
});
//# sourceMappingURL=rootRoute.js.map