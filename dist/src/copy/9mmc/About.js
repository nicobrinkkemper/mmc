import * as React from "react";
import { AboutItem } from "../default/AboutItem.js";
import { AboutItemHeading } from "../default/AboutItemHeading.js";
import { AboutPanel } from "../default/AboutPanel.js";
import { QuestionGetInTouchStatic } from "../default/QuestionGetInTouch.js";
import { QuestionWhatKindOfLevelsStatic } from "../default/QuestionWhatKindOfLevels.js";
export const About9MMC = ({ info, accordion: Accordion = "div", accordionItem: AccordionItem = "div", accordionItemHeading: AccordionItemHeading = "div", accordionItemPanel: AccordionItemPanel = "div", accordionItemButton: AccordionItemButton = "a", }) => {
    const { caps, snake, writtenOut } = info;
    return (React.createElement(Accordion, { preExpanded: ["what_is_" + snake] },
        React.createElement("h1", null,
            "About ",
            caps),
        React.createElement(AboutItem, { accordionItem: AccordionItem },
            React.createElement(AboutItemHeading, { accordionItemHeading: AccordionItemHeading, accordionItemButton: AccordionItemButton },
                "What is ",
                caps,
                "?"),
            React.createElement(AboutPanel, { accordionItemPanel: AccordionItemPanel },
                caps,
                " is the ",
                writtenOut,
                " and the follow-up to 8mmc. We celebrate the birthday of Mario Maker by getting together to create levels that demonstrate just what the game is capable of.")),
        React.createElement(QuestionWhatKindOfLevelsStatic, { accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemPanel: AccordionItemPanel, accordionItemButton: AccordionItemButton }),
        React.createElement(QuestionGetInTouchStatic, { accordionItem: AccordionItem, accordionItemHeading: AccordionItemHeading, accordionItemPanel: AccordionItemPanel, accordionItemButton: AccordionItemButton })));
};
//# sourceMappingURL=About.js.map