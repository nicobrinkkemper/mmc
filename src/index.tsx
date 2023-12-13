import React from "react";
import { AppWrapper } from "./AppWrapper";
import "./index.css";

import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
const AppJSX = (
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
if (rootElement?.hasChildNodes()) {
  hydrate(AppJSX, rootElement);
} else {
  render(AppJSX, rootElement);
}



