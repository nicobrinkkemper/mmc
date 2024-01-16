import { PropsWithChildren } from "react";
import { AccordionItemPanel } from "react-accessible-accordion";

export const AboutPanel = ({ children }: PropsWithChildren) => (
    <AccordionItemPanel>
        <p>{children}</p>
    </AccordionItemPanel>
);
