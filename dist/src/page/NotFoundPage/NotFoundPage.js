import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { LayoutStatic } from "../../layout/Layout.js";
import { NotFoundStatic } from "./NotFound.js";
export function NotFoundPageStatic({ error, theme, images, pathInfo, clickable, }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { type: "simple", small: true, theme: theme, images: images, pathInfo: pathInfo, clickable: clickable },
            React.createElement(NotFoundStatic, { error: error, pathInfo: pathInfo, clickable: clickable }))));
}
//# sourceMappingURL=NotFoundPage.js.map