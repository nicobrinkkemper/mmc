import { RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { createRouter } from "./router/createRouter.js";

// Map of paths to components
const router = createRouter();

const domNode = document.getElementById("root");

if (!domNode) {
  throw new Error("Failed to find root element");
}
const hasDomNode = domNode.hasChildNodes();
// hydrate if root has already been rendered
if (hasDomNode && !import.meta.env.DEV) {
  console.log("hydrating <RouterProvider />");
  hydrateRoot(
    domNode,
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else if (!hasDomNode) {
  const root = createRoot(domNode);
  console.log("rendering <RouterProvider />");
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// For Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}
