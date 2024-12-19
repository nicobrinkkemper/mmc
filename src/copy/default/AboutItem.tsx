import { snakeCase } from "lodash-es";
import * as React from "react";

export type AboutItemProps = React.PropsWithChildren<{
  accordionItem: React.ElementType;
}>;

export const AboutItem = ({
  accordionItem: AccordionItem,
  children,
}: AboutItemProps) => {
  const header: any = Array.isArray(children) ? children[0] : null;
  if (!header) return header;
  const uuid = snakeCase(header.props.children);
  return <AccordionItem uuid={uuid}>{children}</AccordionItem>;
};
