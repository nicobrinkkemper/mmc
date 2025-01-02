import * as React from "react";
import styles from "./accordion.module.css";

export const AboutItemHeading: AboutItemHeadingType = ({
  children,
  accordionItemHeading: AccordionItemHeading,
  accordionItemButton: AccordionItemButton,
}) => (
  <AccordionItemHeading className={styles["accordion__heading"]}>
    <AccordionItemButton>
      <h2>{children}</h2>
    </AccordionItemButton>
  </AccordionItemHeading>
);
