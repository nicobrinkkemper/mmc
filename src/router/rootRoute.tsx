import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { mainTheme } from "../config/constants.js";
import { getStaticData } from "../data/getStaticData.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";

export const rootRoute = createRootRoute({
  component: () => {
    return <Outlet />;
  },
  notFoundComponent: () => (
    <NotFoundPageStatic
      {...getStaticData(mainTheme, "/404")}
      clickable={Link}
    />
  ),
});
