import React from "react";
import { reportWebVitals } from "./reportWebVitals";
import { createRoot } from 'react-dom/client';
import { PRODUCTION } from "./constants";
import { AppWrapper } from "./AppWrapper";
import * as TagManager from "TagManager";
import "./index.css";

const rootElement = document.getElementById("root");
const AppJSX = (
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
createRoot(rootElement!).render(AppJSX);

if (PRODUCTION) {
  reportWebVitals();
  TagManager.initialize();
}
