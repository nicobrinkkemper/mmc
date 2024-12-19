import * as React from "react";
import type { AboutStaticProps } from "../../about/About.js";
import { AboutItem } from "./AboutItem.js";
import { AboutItemHeading } from "./AboutItemHeading.js";
import { AboutPanel } from "./AboutPanel.js";

export const QuestionGetInTouchStatic = ({
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
      How can I get in touch?
    </AboutItemHeading>
    <AboutPanel accordionItemPanel={AccordionItemPanel}>
      At the bottom of every page, you'll find a link to our Discord, Twitter
      page and YouTube channel. So if you have any questions or just want to see
      what's going on, mosey on over!
    </AboutPanel>
  </AboutItem>
);
