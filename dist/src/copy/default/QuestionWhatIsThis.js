import * as React from "react";
import { AboutItem } from "./AboutItem.js";
import { AboutItemHeading } from "./AboutItemHeading.js";
import { AboutPanel } from "./AboutPanel.js";
export const QuestionWhatIsThisStatic = ({ info, accordionItem: AccordionItem = "div", accordionItemHeading: AccordionItemHeading = "div", accordionItemPanel: AccordionItemPanel = "div", accordionItemButton: AccordionItemButton = "a", }) => {
    const { caps, writtenOut } = info;
    return (React.createElement(AboutItem, { accordionItem: AccordionItem },
        React.createElement(AboutItemHeading, { accordionItemHeading: AccordionItemHeading, accordionItemButton: AccordionItemButton },
            "What is ",
            caps,
            "?"),
        React.createElement(AboutPanel, { accordionItemPanel: AccordionItemPanel },
            caps,
            " is the ",
            writtenOut,
            ". We celebrate Mario Maker by getting together to create levels that demonstrate just what the game is capable of.")));
};
//# sourceMappingURL=QuestionWhatIsThis.js.map