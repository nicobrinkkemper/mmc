import * as React from "react";
import { AboutStaticProps } from "../../about/About.js";
import { AboutItem } from "../default/AboutItem.js";
import { AboutItemHeading } from "../default/AboutItemHeading.js";
import { AboutPanel } from "../default/AboutPanel.js";
import { QuestionGetInTouchStatic } from "../default/QuestionGetInTouch.js";
import { QuestionWhatKindOfLevelsStatic } from "../default/QuestionWhatKindOfLevels.js";

export const About9MMC = ({
  info,
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}: Pick<
  AboutStaticProps,
  | "info"
  | "pathInfo"
  | "accordion"
  | "accordionItem"
  | "accordionItemHeading"
  | "accordionItemPanel"
  | "accordionItemButton"
>) => {
  const { caps, snake, writtenOut } = info;
  return (
    <Accordion preExpanded={["what_is_" + snake]}>
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
      <QuestionWhatKindOfLevelsStatic
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
      <QuestionGetInTouchStatic
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
    </Accordion>
  );
};
