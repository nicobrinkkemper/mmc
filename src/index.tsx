import React from "react";
import { createRoot } from 'react-dom/client';
import { PRODUCTION } from "./constants";
import { AppWrapper } from "./AppWrapper";
import { initialize } from "./TagManager";
import "./index.css";

const rootElement = document.getElementById("root");
const AppJSX = (
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
createRoot(rootElement!).render(AppJSX);

if (PRODUCTION) {
  initialize();
}
