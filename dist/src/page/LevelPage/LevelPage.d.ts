import * as React from "react";
export type LevelPageStaticProps = Pick<ThemeStaticData, "theme" | "images" | "pathInfo" | "clickable"> & {
    level: ThemeLevel;
    batch: ThemeBatch;
};
export declare function LevelPageStatic({ theme, images, level, batch, pathInfo, clickable, }: LevelPageStaticProps): React.JSX.Element;
//# sourceMappingURL=LevelPage.d.ts.map