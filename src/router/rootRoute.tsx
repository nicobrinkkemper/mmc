import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { getStaticData } from "../data/getStaticData.js";
import { NotFoundPageStatic } from "../page/NotFoundPage/NotFoundPage.js";

export const rootRoute = createRootRoute({
  component: () => {
    return <Outlet />;
  },
  notFoundComponent: () => (
    <NotFoundPageStatic {...getStaticData("/404")} clickable={Link} />
  ),
});
