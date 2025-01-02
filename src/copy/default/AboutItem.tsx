import { snakeCase } from "lodash-es";
import * as React from "react";

export const AboutItem: AboutItemType = ({
  accordionItem: AccordionItem,
  children,
}) => {
  const header: any = Array.isArray(children) ? children[0] : null;
  if (!header) return header;
  const uuid = snakeCase(header.props.children);
  return <AccordionItem uuid={uuid}>{children}</AccordionItem>;
};
