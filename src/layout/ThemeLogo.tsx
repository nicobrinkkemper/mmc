import { useMemo } from "react";
import { PublicImage } from "../components/PublicImage";
import themes from "../data/themes.json";
import { Theme } from "../theme/ThemeContext";
type logoImageTypes = "logo" | "logo_simple" | "logo_special" | "logo_small";

export function ThemeLogo({
    theme,
    logo: _logo = 'logo',
    small = false,
    className
}: Readonly<{
    theme: Theme;
    logo?: logoImageTypes;
    small?: boolean;
    className?: string;
}>) {

    const Image = useMemo(
        () => {
            let logo = _logo;
            const images = themes[theme].images;
            const endsWithSmall = logo.endsWith("_small");
            if (small && !endsWithSmall) logo = logo + "_small";

            const fallbackType = (
                logo in images ? logo : "logo" + (small ? "_small" : "")
            ) as "logo";

            return <PublicImage {...{
                ...images[fallbackType],
                alt: theme,
                className: className,
            }} />;
        },
        [theme, _logo, small, className]
    );

    return <>{Image}</>;
}