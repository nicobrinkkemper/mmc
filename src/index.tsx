import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.js";
import "./index.css";

const domNode = document.getElementById("root");

if (!domNode) {
  throw new Error("Failed to find root element");
}

// hydrate if root has already been rendered
if (domNode.hasChildNodes() && !import.meta.env.DEV) {
  hydrateRoot(domNode, <App />);
} else {
  const root = createRoot(domNode);
  root.render(<App />);
}

// For Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}
