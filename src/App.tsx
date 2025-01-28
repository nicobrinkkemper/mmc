import classNames from "clsx";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";

type AppType = ThemeComponent<{
  pathInfo: ["theme"];
}>;

export const App: AppType = ({ children, style, pathInfo, ...rest }) => {
  const themeClass = getCss(pathInfo.theme, "Theme");
  return (
    <div className={classNames(styles["App"], themeClass)} {...rest}>
      {children}
    </div>
  );
};
