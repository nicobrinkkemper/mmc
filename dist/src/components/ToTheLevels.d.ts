import * as React from "react";
import type { ButtonProps } from "./Button.js";
export type ToTheLevelsStaticProps = {
    pathInfo: Pick<ThemePathInfo, "toLevels">;
} & Omit<ButtonProps, "icon" | "primary" | "to">;
export declare const ToTheLevelsStatic: ({ pathInfo, ...props }: ToTheLevelsStaticProps) => React.JSX.Element;
//# sourceMappingURL=ToTheLevels.d.ts.map