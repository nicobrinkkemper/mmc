import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToWelcome } from "../../components/BackButton.js";
import { mainTheme } from "../../config/constants.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { BatchesStatic } from "./Batches.js";
export function LevelBatchesPageStatic({ batches = [], theme = mainTheme, images, pathInfo, clickable = "a", }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { theme: theme, images: images, pathInfo: pathInfo, clickable: clickable },
            React.createElement(BackToWelcome, { themeSlug: pathInfo.themeSlug, clickable: clickable }),
            React.createElement(BatchesStatic, { batches: batches, clickable: clickable }))));
}
//# sourceMappingURL=LevelBatchesPage.static.js.map