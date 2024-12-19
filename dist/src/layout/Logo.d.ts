import * as React from "react";
export type LogoStaticProps = React.PropsWithChildren<{
    logo?: logoImageTypes;
    small?: boolean;
    className?: string;
    theme: Theme;
    images: ThemeImages;
    pathInfo: ThemePathInfo;
    nextAndPrevTheme?: ThemePropsNextAndPrev;
    clickable: React.ElementType;
}>;
export declare const LogoStatic: ({ logo, small, className, theme, images, pathInfo, nextAndPrevTheme, clickable: Clickable, }: LogoStaticProps) => React.JSX.Element;
//# sourceMappingURL=Logo.d.ts.map