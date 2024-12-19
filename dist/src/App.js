"use client";
import { RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import { createRouter } from "./router/createRouter.js";
// Map of paths to components
const router = createRouter();
export const App = () => {
    return React.createElement(RouterProvider, { router: router });
};
//# sourceMappingURL=App.js.map