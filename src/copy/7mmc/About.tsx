import * as React from "react";
import { AboutItem } from "../default/AboutItem.js";
import { AboutItemHeading } from "../default/AboutItemHeading.js";
import { AboutPanel } from "../default/AboutPanel.js";
import { QuestionGetInTouch } from "../default/QuestionGetInTouch.js";
import { QuestionWhatKindOfLevels } from "../default/QuestionWhatKindOfLevels.js";

export const About7MMC: DefaultAboutContentType = ({
  info: { caps, writtenOut },
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemButton: AccordionItemButton = "a",
  accordionItemPanel: AccordionItemPanel = "div",
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
          {caps} is the {writtenOut} and the follow-up to the YMM project. After
          the original organizers retired from running the anniversary project,
          it was decided it was time for a rebranding and a reassessment of what
          the project should be about. But the main focus is still to celebrate
          the birthday of Mario Maker by getting together to create levels that
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
