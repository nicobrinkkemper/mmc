import { PropsWithChildren } from "react";
import { AccordionItemButton, AccordionItemHeading } from "react-accessible-accordion";

export const AboutItemHeading = ({ children }: PropsWithChildren) => (
    <AccordionItemHeading>
        <AccordionItemButton>
            <h2>{children}</h2>
        </AccordionItemButton>
    </AccordionItemHeading>
);