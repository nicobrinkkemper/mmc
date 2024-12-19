import classnames from "classnames";
import * as React from "react";
import styles from "./Card.module.css";
import { Image } from "./Image.js";
function CardOuter({ children, heading, }) {
    if (!heading)
        return React.createElement(React.Fragment, null, children);
    return (React.createElement("div", { className: classnames(styles["CardOuter"]) },
        React.createElement("h1", null, heading),
        children));
}
function CardInner({ clickable: Clickable = "a", children, href, disabled, className, }) {
    const names = classnames(styles["CardInner"], className);
    if (!href)
        return React.createElement("div", { className: names }, children);
    return (React.createElement(Clickable, { href: href, to: href, "aria-disabled": disabled, className: names }, children));
}
function CardIllustration({ illustration, type, images, }) {
    if (!illustration)
        return null;
    const names = classnames(type === "special"
        ? styles["SpecialCardIllustration"]
        : styles["CardIllustration"], illustration);
    return (React.createElement(Image, { alt: "illustration", name: "illustration", className: names, images: images }));
}
export const Card = ({ children, illustration, disabled = false, href, type = "simple", className, heading, subHeading, images, clickable: Clickable, }) => {
    const names = classnames(illustration, styles["Card"], illustration, className, disabled && styles["IsCardDisabled"], !!href && styles["IsClickableCard"], illustration &&
        (type === "special"
            ? styles["HasSpecialCardIllustration"]
            : styles["HasCardIllustration"]));
    return (React.createElement(CardOuter, { heading: heading },
        React.createElement(CardInner, { href: href, disabled: disabled, className: names, clickable: Clickable },
            images ? (React.createElement(CardIllustration, { illustration: illustration, type: type, images: images })) : null,
            React.createElement("h2", null, subHeading),
            children)));
};
//# sourceMappingURL=Card.js.map