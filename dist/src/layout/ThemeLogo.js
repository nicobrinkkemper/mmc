import * as React from "react";
import { PublicImage } from "../components/PublicImage.js";
export function ThemeLogoStatic({ theme, logo: _logo = "logo", small = false, className, images, }) {
    let logo = _logo;
    const endsWithSmall = logo.endsWith("_small");
    if (small && !endsWithSmall)
        logo = (logo + "_small");
    if (!images)
        return null;
    const fallbackType = (logo in images ? logo : "logo" + (small ? "_small" : ""));
    return (React.createElement(PublicImage, { ...images[fallbackType],
        alt: theme,
        className: className }));
}
//# sourceMappingURL=ThemeLogo.js.map