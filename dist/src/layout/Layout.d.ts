import * as React from "react";
import { LogoStaticProps } from "./Logo.js";
export type LayoutProps = React.PropsWithChildren<{
    className?: string;
    type?: "special" | "simple" | "normal";
}> & Omit<LogoStaticProps, "logo">;
export declare function LayoutStatic({ children, className, type, small, theme, images, pathInfo, nextAndPrevTheme, clickable, }: LayoutProps): React.JSX.Element;
//# sourceMappingURL=Layout.d.ts.map