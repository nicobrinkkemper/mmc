import { memo } from "react";
import { PublicImage } from "../components/PublicImage";
import themes from "../data/themes.json";
import { Theme } from "../theme/ThemeContext";
type logoImageTypes = "logo" | "logo_simple" | "logo_special" | "logo_small";

function _ThemeLogo({
    theme,
    logo = 'logo',
    small = false,
    className
}: Readonly<{
    theme: Theme;
    logo?: logoImageTypes;
    small?: boolean;
    className?: string;
}>) {
    const images = themes[theme].images;
    const endsWithSmall = logo.endsWith("_small");
    if (small && !endsWithSmall) logo = logo + "_small";

    const fallbackType = (
        logo in images ? logo : "logo" + (small ? "_small" : "")
    ) as "logo";

    return <PublicImage className={className} alt={theme} {...images[fallbackType]} />;
}
export const ThemeLogo = memo(_ThemeLogo, (a, b) => {
    return a.theme === b.theme && a.logo === b.logo && a.small === b.small;
});