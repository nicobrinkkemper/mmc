import * as React from "react";
export declare function BackToBatch({ batch, clickable, }: {
    batch: Pick<ThemeBatch, "pathInfo" | "releaseDate">;
} & Clickable): React.JSX.Element;
export declare function BackToWeeks({ toLevels, clickable, }: Pick<ThemePathInfo, "toLevels"> & Clickable): React.JSX.Element;
export declare function BackToWelcome({ themeSlug, clickable, }: Pick<ThemePathInfo, "themeSlug"> & Clickable): React.JSX.Element;
//# sourceMappingURL=BackButton.d.ts.map