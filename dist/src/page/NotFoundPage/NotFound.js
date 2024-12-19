import * as React from "react";
import { Button } from "../../components/Button.js";
import { Card } from "../../components/Card.js";
import { ToTheLevelsStatic } from "../../components/ToTheLevels.js";
import styles from "./NotFound.module.css";
const NotFoundStatic = ({ error, pathInfo, clickable, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles["Card"] },
            React.createElement("p", null, "This page was not found, sorry! Jank can happen sometimes."),
            error ? React.createElement("p", null,
                "The error message for the web developer: ",
                error) : null),
        React.createElement("div", { className: styles["Buttons"] },
            React.createElement(ToTheLevelsStatic, { pathInfo: { toLevels: pathInfo.toLevels }, clickable: clickable }),
            React.createElement(Button, { icon: "arrow-right", href: pathInfo.to, clickable: clickable }, "To homepage"))));
};
export { NotFoundStatic };
//# sourceMappingURL=NotFound.js.map