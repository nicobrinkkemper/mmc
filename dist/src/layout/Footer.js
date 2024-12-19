import * as React from "react";
import styles from "./Footer.module.css";
export function FooterStatic({ pathInfo: { toCredits }, clickable: Clickable = "a", }) {
    return (React.createElement("footer", { className: styles["Footer"] },
        React.createElement("a", { href: "https://discord.gg/8mnW3XfZq9", rel: "noopener noreferrer", target: "_BLANK" }, "Discord"),
        React.createElement("a", { href: "https://www.youtube.com/channel/UClayAs7TxVjMbzBLxBbqyoQ", rel: "noopener noreferrer", target: "_BLANK" }, "Youtube"),
        React.createElement(Clickable, { relative: "route", href: toCredits }, "Credits")));
}
//# sourceMappingURL=Footer.js.map