"use client";
import "./ssr.js";
// import * as React from "react";
// import { createRoot, hydrateRoot } from "react-dom/client";
// import { createFromFetch } from "react-server-dom-esm/client";
// import { Client } from "./Client.js";
// import { getThemePathInfo } from "./data/getThemePathInfo.js";
// import "./index.css";

// const domNode = document.getElementById("root");
// if (!domNode) {
//   console.warn("Failed to find root element");
// }
// const hasDomNode = domNode?.hasChildNodes();

// const pathInfo = getThemePathInfo(window.location.href);

// const rscData = createFromFetch(
//   fetch(window.location.href, {
//     headers: { Accept: "text/x-component" },
//   }),
//   {
//     moduleBaseURL: "/dist/",
//   }
// );

// if (hasDomNode && !import.meta.env.DEV) {
//   hydrateRoot(
//     domNode!,
//     <Client pathInfo={pathInfo as any}>
//       {rscData as any as React.ReactNode}
//     </Client>
//   );
// } else if (!hasDomNode) {
//   const root = createRoot(domNode!);
//   root.render(
//     <Client pathInfo={pathInfo as any}>
//       {rscData as any as React.ReactNode}
//     </Client>
//   );

//   if (import.meta.hot) {
//     import.meta.hot.accept();
//   }
// }
