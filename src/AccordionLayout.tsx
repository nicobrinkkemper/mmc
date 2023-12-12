import { snakeCase } from "lodash";
import { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";



export const accordionComponents = {
  h2: ({ children }: PropsWithChildren<{ key: any }>) => (
    <AccordionItemHeading>
      <AccordionItemButton>
        <h2>{children}</h2>
      </AccordionItemButton>
    </AccordionItemHeading>
  ),
  hr: () => null,
  p: ({ children }: PropsWithChildren<Record<string, unknown>>) => (
    <AccordionItemPanel>
      <p>{children}</p>
    </AccordionItemPanel>
  ),
  blockquote: (props: PropsWithChildren<{ key: any }>) => {
    const header: any = Array.isArray(props.children) ? props.children[0] : null;
    if (!header) return header;
    const uuid = snakeCase(header.props.children)
    return <AccordionItem uuid={uuid}>{props.children}</AccordionItem>;
  }
};
const AccordionLayout = ({
  children
}: PropsWithChildren<Record<string, unknown>>) => {
  return <Accordion preExpanded={["what_is_7_mmc"]}>{children}</Accordion>;
};

export default AccordionLayout;
