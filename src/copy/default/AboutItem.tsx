import * as React from "react";
import { aboutSectionSlug } from "./aboutSlug.js";

export const AboutItem: AboutItemType = ({
  accordionItem: AccordionItem,
  preExpanded,
  children,
}) => {
  const header: any = Array.isArray(children) ? children[0] : null;
  if (!header) return header;
  // JSX like `What is {caps}?` arrives as split children — join the text
  // parts (no comma artifacts from array toString) before slugging, so the
  // id matches what preExpanded producers compute from the plain string.
  const text = React.Children.toArray(header.props.children)
    .filter((c) => typeof c === "string" || typeof c === "number")
    .join("");
  const uuid = aboutSectionSlug(text);
  const open = preExpanded?.includes(uuid) || undefined;
  return (
    <AccordionItem id={uuid} open={open}>
      {children}
    </AccordionItem>
  );
};
