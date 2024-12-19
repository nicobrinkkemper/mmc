import * as React from "react";
import { PropsWithChildren } from "react";

export type AboutPanelProps = PropsWithChildren<{
  accordionItemPanel: React.ElementType;
}>;

export const AboutPanel = ({
  children,
  accordionItemPanel: AccordionItemPanel,
}: AboutPanelProps) => (
  <AccordionItemPanel>
    <p>{children}</p>
  </AccordionItemPanel>
);
