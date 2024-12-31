/** @jsxImportSource react */
"use client";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Client } from "./Client.js";
import { getThemePathInfo } from "./data/getThemePathInfo.js";
import "./index.css";
// Map of paths to components

const domNode = document.getElementById("root");

if (!domNode) {
  throw new Error("Failed to find root element");
}
const hasDomNode = domNode.hasChildNodes();

const pathInfo = getThemePathInfo(
  new URL(window.location.href).pathname as ValidPath
);
// hydrate if root has already been rendered
if (hasDomNode && !import.meta.env.DEV) {
  hydrateRoot(domNode, <Client pathInfo={pathInfo as any} />);
} else if (!hasDomNode) {
  // Ensure router is ready before rendering
  const root = createRoot(domNode);
  root.render(<Client pathInfo={pathInfo as any} />);

  // For Vite HMR
  if (import.meta.hot) {
    import.meta.hot.accept();
  }
}
