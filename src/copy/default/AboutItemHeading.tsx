import * as React from "react";
import styles from "./accordion.module.css";

export type AboutItemHeadingProps = React.PropsWithChildren<{
  accordionItemHeading: React.ElementType;
  accordionItemButton: React.ElementType;
}>;

export const AboutItemHeading = ({
  children,
  accordionItemHeading: AccordionItemHeading,
  accordionItemButton: AccordionItemButton,
}: AboutItemHeadingProps) => (
  <AccordionItemHeading className={styles["accordion__heading"]}>
    <AccordionItemButton>
      <h2>{children}</h2>
    </AccordionItemButton>
  </AccordionItemHeading>
);
