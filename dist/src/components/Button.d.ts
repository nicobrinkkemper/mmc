import * as React from "react";
import { ButtonIcons } from "./ButtonIcons.js";
export type ButtonProps = React.PropsWithChildren<{
    primary?: boolean;
    inverted?: boolean;
    href?: string;
    to?: string;
    id?: string;
    icon: keyof typeof ButtonIcons;
    iconPosition?: "left" | "right";
    className?: string;
    hidden?: boolean;
} & Clickable>;
export declare const Button: ({ children, primary, icon, href, inverted, hidden, iconPosition, className, id, clickable: Clickable, }: ButtonProps) => React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map