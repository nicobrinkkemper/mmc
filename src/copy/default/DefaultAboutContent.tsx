import * as React from "react";
import styles from "./accordion.module.css";
import { QuestionGetInTouchStatic } from "./QuestionGetInTouch.js";
import { QuestionWhatIsThisStatic } from "./QuestionWhatIsThis.js";
import { QuestionWhatKindOfLevelsStatic } from "./QuestionWhatKindOfLevels.js";

export const DefaultAboutContentStatic: DefaultAboutContentType = ({
  info: { caps, snake, writtenOut },
  accordion: Accordion = "div",
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}) => {
  return (
    <Accordion
      className={styles["accordion"]}
      preExpanded={["what_is_" + snake]}
    >
      <h1>About {caps}</h1>
      <QuestionWhatIsThisStatic
        info={{
          caps,
          writtenOut,
        }}
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
