import * as React from "react";
import styles from "./MakerName.module.css";
export function MakerName({ makerName, nationality, makerId }) {
    return React.createElement("div", { className: styles['MakerName'] },
        React.createElement("span", { className: `${styles['Nationality']} flag-icon flag-icon-${nationality.toLowerCase()}` }),
        React.createElement("span", { className: styles['Name'] }, makerName),
        makerId ? React.createElement("span", { className: styles['MakerId'] }, makerId) : null);
}
//# sourceMappingURL=MakerName.js.map