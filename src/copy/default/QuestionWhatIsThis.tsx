import * as React from "react";
import { AboutItem } from "./AboutItem.js";
import { AboutItemHeading } from "./AboutItemHeading.js";
import { AboutPanel } from "./AboutPanel.js";

export const QuestionWhatIsThisStatic: QuestionWhatIsThisType = ({
  info: { caps, writtenOut },
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}) => {
  return (
    <AboutItem accordionItem={AccordionItem}>
      <AboutItemHeading
        accordionItemHeading={AccordionItemHeading}
        accordionItemButton={AccordionItemButton}
      >
        What is {caps}?
      </AboutItemHeading>
      <AboutPanel accordionItemPanel={AccordionItemPanel}>
        {caps} is the {writtenOut}. We celebrate Mario Maker by getting together
        to create levels that demonstrate just what the game is capable of.
      </AboutPanel>
    </AboutItem>
  );
};
