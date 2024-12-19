"use client";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { mainTheme, PUBLIC_URL } from "../config/constants.js";
import { routeTree } from "./routeTree.js";

export function createRouter() {
  return createTanstackRouter({
    routeTree,
    basepath: PUBLIC_URL,
    context: { theme: mainTheme },
    defaultPreload: "intent",
  });
}
