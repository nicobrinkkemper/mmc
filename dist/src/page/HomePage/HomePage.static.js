import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { mainTheme } from "../../config/constants.js";
import { Content } from "../../copy/Content.js";
import { LayoutStatic } from "../../layout/Layout.js";
export function HomePageStatic({ theme = mainTheme, images, info, pathInfo, nextAndPrevTheme, clickable: Clickable = "a", }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { type: "special", theme: theme, images: images, pathInfo: pathInfo, nextAndPrevTheme: nextAndPrevTheme, clickable: Clickable },
            React.createElement(Content.Welcome, { theme: theme, images: images, info: info, pathInfo: pathInfo, clickable: Clickable }))));
}
//# sourceMappingURL=HomePage.static.js.map