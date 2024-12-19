import classNames from "classnames";
import * as React from "react";
import styles from "./Tags.module.css";
export function Tags({ tags, }) {
    return (React.createElement("div", { className: styles['Tags'] }, Object.entries(tags).map(([key, tag]) => {
        return (React.createElement("span", { className: classNames(styles['Tag'], styles[key]), key: key }, tag));
    })));
}
//# sourceMappingURL=Tags.js.map