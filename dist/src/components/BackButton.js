import * as React from "react";
import styles from "./BackButton.module.css";
import { Button } from "./Button.js";
export function BackToBatch({ batch, clickable, }) {
    return (React.createElement(Button, { icon: "arrow-left-inverted", iconPosition: "left", href: batch.pathInfo.to, inverted: true, className: styles["BackButton"], clickable: clickable }, `Back to ${batch.releaseDate.formatted}`));
}
export function BackToWeeks({ toLevels, clickable, }) {
    return (React.createElement(Button, { icon: "arrow-left-inverted", iconPosition: "left", href: toLevels, inverted: true, className: styles["BackButton"], clickable: clickable }, "Back to Overview"));
}
export function BackToWelcome({ themeSlug, clickable, }) {
    return (React.createElement(Button, { icon: "arrow-left-inverted", iconPosition: "left", href: themeSlug, inverted: true, className: styles["BackButton"], clickable: clickable }, "Back to Welcome"));
}
//# sourceMappingURL=BackButton.js.map