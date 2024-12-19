import * as React from "react";
export type LevelBatchPageStaticProps = Pick<ThemeStaticData, "theme" | "images" | "pathInfo"> & {
    batch: ThemeBatch;
} & Clickable;
export declare function LevelBatchPageStatic({ theme, images, pathInfo, batch, clickable, }: LevelBatchPageStaticProps): React.JSX.Element;
//# sourceMappingURL=LevelBatchPage.d.ts.map