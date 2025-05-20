import * as React from "react";
import { AboutItem } from "../default/AboutItem.js";
import { AboutItemHeading } from "../default/AboutItemHeading.js";
import { AboutPanel } from "../default/AboutPanel.js";
import { QuestionGetInTouch } from "../default/QuestionGetInTouch.js";
import { QuestionWhatKindOfLevels } from "../default/QuestionWhatKindOfLevels.js";

export const About9MMC: DefaultAboutContentType = ({
  info: { caps, writtenOut },
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}) => {
  return (
    <Accordion>
      <h1>About {caps}</h1>
      <AboutItem accordionItem={AccordionItem}>
        <AboutItemHeading
          accordionItemHeading={AccordionItemHeading}
          accordionItemButton={AccordionItemButton}
        >
          What is {caps}?
        </AboutItemHeading>
        <AboutPanel accordionItemPanel={AccordionItemPanel}>
          {caps} is the {writtenOut} and the follow-up to 8mmc. We celebrate the
          birthday of Mario Maker by getting together to create levels that
          demonstrate just what the game is capable of.
        </AboutPanel>
      </AboutItem>
      <QuestionWhatKindOfLevels
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
      <QuestionGetInTouch
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
    </Accordion>
  );
};
