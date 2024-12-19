import classNames from "classnames";
import * as React from "react";
import styles from "./App.module.css";
import { getCss } from "./css/getCss.js";
export const AppStatic = ({ theme, children, style, ...rest }) => {
    const Theme = getCss(theme, "Theme");
    return (React.createElement("div", { className: classNames(styles["App"], Theme), style: style ? style : { overflowY: "scroll" }, ...rest }, children));
};
//# sourceMappingURL=App.static.js.map