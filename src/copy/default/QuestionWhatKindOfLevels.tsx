import * as React from "react";
import type { AboutStaticProps } from "../../about/About.js";
import { AboutItem } from "./AboutItem.js";
import { AboutItemHeading } from "./AboutItemHeading.js";
import { AboutPanel } from "./AboutPanel.js";

export const QuestionWhatKindOfLevelsStatic = ({
  accordionItem: AccordionItem = "div",
  accordionItemHeading: AccordionItemHeading = "div",
  accordionItemPanel: AccordionItemPanel = "div",
  accordionItemButton: AccordionItemButton = "a",
}: Pick<
  AboutStaticProps,
  | "accordionItem"
  | "accordionItemHeading"
  | "accordionItemPanel"
  | "accordionItemButton"
>) => (
  <AboutItem accordionItem={AccordionItem}>
    <AboutItemHeading
      accordionItemHeading={AccordionItemHeading}
      accordionItemButton={AccordionItemButton}
    >
      So what kind of levels are these?
    </AboutItemHeading>
    <AboutPanel accordionItemPanel={AccordionItemPanel}>
      You'll find platformers, gimmicks, puzzles, music levels, trolls and many
      more level types. Each maker plays to their own strengths to make an as
      accomplished, original and polished level they can. You'll find short
      descriptions as well as category tags and a difficulty rating. This way
      you should be able to find something that suits you.
    </AboutPanel>
  </AboutItem>
);
