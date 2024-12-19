import * as React from "react";
import styles from "./accordion.module.css";
import { QuestionGetInTouchStatic } from "./QuestionGetInTouch.js";
import { QuestionWhatIsThisStatic } from "./QuestionWhatIsThis.js";
import { QuestionWhatKindOfLevelsStatic } from "./QuestionWhatKindOfLevels.js";
export const DefaultAboutContentStatic = ({ info, accordion: Accordion = "div", accordionItem: AccordionItem = "div", accordionItemHeading: AccordionItemHeading = "div", accordionItemPanel: AccordionItemPanel = "div", accordionItemButton: AccordionItemButton = "a", }) => {
    const { caps, snake } = info;
    return (React.createElement(Accordion, { className: styles["accordion"], preExpanded: ["what_is_" + snake] },
        React.createElement("h1", null,
            "About ",
            caps),
        React.createElement(QuestionWhatIsThisStatic, { info: info, accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemPanel: AccordionItemPanel, accordionItemButton: AccordionItemButton }),
        React.createElement(QuestionWhatKindOfLevelsStatic, { accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemPanel: AccordionItemPanel, accordionItemButton: AccordionItemButton }),
        React.createElement(QuestionGetInTouchStatic, { accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemPanel: AccordionItemPanel, accordionItemButton: AccordionItemButton })));
};
//# sourceMappingURL=DefaultAboutContent.js.map