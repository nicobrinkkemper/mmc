import * as React from "react";
import type { AboutStaticProps } from "../../about/About.js";
import styles from "./accordion.module.css";
import { QuestionGetInTouchStatic } from "./QuestionGetInTouch.js";
import { QuestionWhatIsThisStatic } from "./QuestionWhatIsThis.js";
import { QuestionWhatKindOfLevelsStatic } from "./QuestionWhatKindOfLevels.js";

export type DefaultAboutContentStaticProps = AboutStaticProps;

export const DefaultAboutContentStatic = ({
  info,
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}: DefaultAboutContentStaticProps) => {
  const { caps, snake } = info;
  return (
    <Accordion
      className={styles["accordion"]}
      preExpanded={["what_is_" + snake]}
    >
      <h1>About {caps}</h1>
      <QuestionWhatIsThisStatic
        info={info}
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
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
