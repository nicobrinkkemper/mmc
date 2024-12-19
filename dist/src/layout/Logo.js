import classNames from "classnames";
import * as React from "react";
import styles from "./Logo.module.css";
import { ThemeLogoStatic } from "./ThemeLogo.js";
export const LogoStatic = ({ logo = "logo", small = false, className, theme, images, pathInfo, nextAndPrevTheme, clickable: Clickable = "a", }) => {
    const size = small ? "small" : "big";
    return (React.createElement(React.Fragment, null,
        React.createElement(Clickable, { href: pathInfo.themeSlug, className: classNames(className, styles["Logo"], styles[size], styles[logo]) },
            React.createElement(ThemeLogoStatic, { small: small, logo: logo, theme: theme, images: images })),
        nextAndPrevTheme?.prevTheme.exists === true ? (React.createElement(Clickable, { className: styles["PrevTheme"], href: pathInfo.isCredits
                ? nextAndPrevTheme.prevTheme.theme.pathInfo.toCredits
                : pathInfo.isBatches
                    ? nextAndPrevTheme.prevTheme.theme.pathInfo.toLevels
                    : nextAndPrevTheme.prevTheme.theme.pathInfo.themeSlug },
            React.createElement(ThemeLogoStatic, { theme: nextAndPrevTheme.prevTheme.theme.theme, small: true, logo: "logo_simple", images: nextAndPrevTheme.prevTheme.theme.images }))) : null,
        nextAndPrevTheme?.nextTheme.exists === true ? (React.createElement(Clickable, { className: styles["NextTheme"], href: pathInfo.isCredits
                ? nextAndPrevTheme.nextTheme.theme.pathInfo.toCredits
                : pathInfo.isBatches
                    ? nextAndPrevTheme.nextTheme.theme.pathInfo.toLevels
                    : nextAndPrevTheme.nextTheme.theme.pathInfo.themeSlug },
            React.createElement(ThemeLogoStatic, { theme: nextAndPrevTheme.nextTheme.theme.theme, small: true, logo: "logo_simple", images: nextAndPrevTheme.nextTheme.theme.images }))) : null));
};
//# sourceMappingURL=Logo.js.map