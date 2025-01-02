import classNames from "classnames";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";

type AppType = ThemeComponent<{
  pathInfo: ["theme"];
}>;

export const App: AppType = ({ children, style, pathInfo, ...rest }) => {
  return (
    <div
      className={classNames(styles["App"], getCss(pathInfo.theme, "Theme"))}
      {...rest}
    >
      {children}
    </div>
  );
};
