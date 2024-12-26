import classNames from "classnames";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";

export const AppStatic: ThemeComponent<{
  pathInfo: ["theme"];
}> = ({ children, style, pathInfo, ...rest }) => {
  const Theme = getCss(pathInfo.theme, "Theme");
  return (
    <>
      <div className={classNames(styles["App"], Theme)} {...rest}>
        {children}
      </div>
    </>
  );
};
