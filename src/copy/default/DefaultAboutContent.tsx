import * as React from "react";
import styles from "./accordion.module.css";
import { QuestionGetInTouch } from "./QuestionGetInTouch.js";
import { QuestionWhatIsThis } from "./QuestionWhatIsThis.js";
import { QuestionWhatKindOfLevels } from "./QuestionWhatKindOfLevels.js";

export const DefaultAboutContent: DefaultAboutContentType = ({
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
      <QuestionWhatIsThis
        info={{
          caps,
          writtenOut,
        }}
        accordionItem={AccordionItem}
        accordionItemHeading={AccordionItemHeading}
        accordionItemPanel={AccordionItemPanel}
        accordionItemButton={AccordionItemButton}
      />
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
