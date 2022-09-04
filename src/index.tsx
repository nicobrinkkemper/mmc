import "./index.css";
import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot, hydrateRoot } from 'react-dom/client';
import TagManager from "react-gtm-module";
import { isProduction } from "./environment";
import { AppWrapper } from "./AppWrapper";

const tagManagerArgs = {
  gtmId: "G-J20RKJ4B98"
};

const rootElement = document.getElementById("root");
const AppJSX = (
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
if (rootElement?.hasChildNodes()) {
  hydrateRoot(rootElement, AppJSX);
} else {
  createRoot(rootElement!).render(AppJSX);
}

if (isProduction) {
  TagManager.initialize(tagManagerArgs);
  reportWebVitals();
}
