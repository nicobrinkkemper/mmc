import classNames from "classnames";
import * as React from "react";
import styles from "./Button.module.css";
import { ButtonIcons } from "./ButtonIcons.js";
export const Button = ({ children, primary, icon, href, inverted = false, hidden = false, iconPosition = "right", className, id, clickable: Clickable = "a", }) => {
    const shouldForceBlank = typeof href === "string" &&
        (href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("//"));
    const classN = classNames(className, styles["Button"], primary && styles["primary"], inverted && styles["inverted"], typeof ButtonIcons[icon] === "string" && styles["hasIcon"], iconPosition === "left" && styles["iconIsLeft"], hidden && styles["hidden"]);
    const Icon = (React.createElement("span", { className: classNames(styles["ButtonIcon"], styles[icon]) }, ButtonIcons[icon]));
    const blankProps = shouldForceBlank
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
    return (React.createElement(Clickable, { href: href, id: id, className: classN, ...blankProps },
        React.createElement("div", { className: styles["ButtonInner"] },
            iconPosition === "left" ? Icon : null,
            React.createElement("span", { className: styles["ButtonLabel"] }, children),
            iconPosition !== "left" ? Icon : null)));
};
//# sourceMappingURL=Button.js.map