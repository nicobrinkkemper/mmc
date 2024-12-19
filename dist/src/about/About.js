import classNames from "classnames";
import * as React from "react";
import { DefaultAboutContentStatic } from "../copy/default/DefaultAboutContent.js";
import { default as classes } from "./About.module.css";
import { CloseSvg } from "./CloseSvg.js";
export const AboutStatic = ({ closeProps, info, pathInfo, accordion: Accordion = "div", accordionItem: AccordionItem = "div", accordionItemHeading: AccordionItemHeading = "div", accordionItemButton: AccordionItemButton = "a", accordionItemPanel: AccordionItemPanel = "div", }) => {
    return (React.createElement("div", { className: classes["outer"], id: "!/about" },
        React.createElement("div", { className: classes["main"] },
            React.createElement("div", { className: classes["inner"] },
                React.createElement("div", { className: classes["header"] },
                    React.createElement("a", { className: classNames(classes["close"], closeProps?.className), ...closeProps },
                        React.createElement(CloseSvg, null))),
                React.createElement("div", { className: classes["body"] },
                    React.createElement("div", null,
                        React.createElement(DefaultAboutContentStatic, { info: info, pathInfo: pathInfo, accordion: Accordion, accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemButton: AccordionItemButton, accordionItemPanel: AccordionItemPanel })))))));
};
//# sourceMappingURL=About.js.map