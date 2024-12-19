import * as React from "react";
import { AppStatic } from "../../App.static.js";
import { BackToWelcome } from "../../components/BackButton.js";
import { mainTheme } from "../../config/constants.js";
import { Content } from "../../copy/Content.js";
import { LayoutStatic } from "../../layout/Layout.js";
import styles from "./Credits.module.css";
export function CreditsPageStatic({ theme = mainTheme, images, pathInfo, nextAndPrevTheme, clickable, }) {
    return (React.createElement(AppStatic, { theme: theme },
        React.createElement(LayoutStatic, { type: "special", theme: theme, images: images, pathInfo: pathInfo, nextAndPrevTheme: nextAndPrevTheme, clickable: clickable },
            React.createElement(BackToWelcome, { themeSlug: pathInfo.themeSlug, clickable: clickable }),
            React.createElement(Content.Credits, { className: styles["CreditsCard"], theme: theme }))));
}
//# sourceMappingURL=CreditsPage.js.map