import { PropsWithChildren } from "react";
import { AccordionItemButton, AccordionItemHeading } from "react-accessible-accordion";
import styles from './accordion.module.css';

export const AboutItemHeading = ({ children }: PropsWithChildren) => (
    <AccordionItemHeading className={styles.accordion__heading}>
        <AccordionItemButton>
            <h2>{children}</h2>
        </AccordionItemButton>
    </AccordionItemHeading>
);