import * as React from "react";
import { FooterStatic } from "./Footer.js";
import { LogoStatic } from "./Logo.js";
export function LayoutStatic({ children, className, type = "normal", small = false, theme, images, pathInfo, nextAndPrevTheme, clickable, }) {
    return (React.createElement(React.Fragment, null,
        React.createElement(LogoStatic, { small: small, logo: type === "normal" ? "logo" : `logo_${type}`, theme: theme, pathInfo: pathInfo, images: images, nextAndPrevTheme: nextAndPrevTheme, clickable: clickable }),
        React.createElement("article", { className: className }, children),
        React.createElement(FooterStatic, { pathInfo: pathInfo, clickable: clickable })));
}
//# sourceMappingURL=Layout.js.map