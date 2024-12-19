import * as React from "react";
export type CreditPageProps = {
    theme: Theme;
    images: Themes[Theme]["images"];
    pathInfo: ThemePathInfo;
    nextAndPrevTheme: ThemePropsNextAndPrev;
} & Clickable;
export declare function CreditsPageStatic({ theme, images, pathInfo, nextAndPrevTheme, clickable, }: CreditPageProps): React.JSX.Element;
//# sourceMappingURL=CreditsPage.d.ts.map