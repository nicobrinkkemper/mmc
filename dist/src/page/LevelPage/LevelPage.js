import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToBatch } from "../../components/BackButton.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { LevelStatic } from "./Level.js";
export function LevelPageStatic({ theme, images, level, batch, pathInfo, clickable, }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { small: true, type: "simple", theme: theme, images: images, pathInfo: pathInfo, clickable: clickable },
            React.createElement(BackToBatch, { batch: batch, clickable: clickable }),
            React.createElement(LevelStatic, { level: level, clickable: clickable }))));
}
//# sourceMappingURL=LevelPage.js.map