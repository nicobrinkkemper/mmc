import * as React from "react";
import { PropsWithChildren } from "react";
export type CardProps = PropsWithChildren<{
    illustration?: boolean;
    disabled?: boolean;
    href?: string;
    className?: string;
    heading?: string;
    subHeading?: string;
    type?: "special" | "simple";
    images?: Record<string, any>;
    clickable?: React.ElementType;
}>;
export declare const Card: ({ children, illustration, disabled, href, type, className, heading, subHeading, images, clickable: Clickable, }: CardProps) => React.JSX.Element;
//# sourceMappingURL=Card.d.ts.map