import { snakeCase } from "lodash";
import { PropsWithChildren } from "react";
import { AccordionItem } from "react-accessible-accordion";

export const AboutItem = (props: PropsWithChildren<{}>) => {
    const header: any = Array.isArray(props.children) ? props.children[0] : null;
    if (!header) return header;
    const uuid = snakeCase(header.props.children)
    return <AccordionItem uuid={uuid}>{props.children}</AccordionItem>;
}