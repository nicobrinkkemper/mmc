import * as React from "react";
export type StaticHomePageProps = {
    theme: Theme;
    images: Themes[Theme]["images"];
    info: ThemeInfo;
    pathInfo: ThemePathInfo;
    nextAndPrevTheme: ThemePropsNextAndPrev;
    clickable?: React.ElementType;
};
export declare function HomePageStatic({ theme, images, info, pathInfo, nextAndPrevTheme, clickable: Clickable, }: StaticHomePageProps): React.JSX.Element;
//# sourceMappingURL=HomePage.static.d.ts.map