import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { mainTheme } from "../config/themeConfig.js";
import { getStaticData } from "../data/getStaticData.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";

export const rootRoute = createRootRoute({
  component: () => {
    return <Outlet />;
  },
  notFoundComponent: () => (
    <NotFoundPageStatic
      {...getStaticData(`/${mainTheme}`, {
        pathInfo: true,
        images: ["logo"],
        clickable: true,
      })}
      clickable={Link}
    />
  ),
});
