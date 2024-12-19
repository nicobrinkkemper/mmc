import * as React from "react";
import styles from "./accordion.module.css";
export const AboutItemHeading = ({ children, accordionItemHeading: AccordionItemHeading, accordionItemButton: AccordionItemButton, }) => (React.createElement(AccordionItemHeading, { className: styles["accordion__heading"] },
    React.createElement(AccordionItemButton, null,
        React.createElement("h2", null, children))));
//# sourceMappingURL=AboutItemHeading.js.map