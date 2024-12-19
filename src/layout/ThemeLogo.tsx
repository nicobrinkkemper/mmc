import * as React from "react";
import { PublicImage } from "../components/PublicImage.js";

export type ThemeLogoStaticProps = {
  theme: Theme;
  logo?: logoImageTypes;
  small?: boolean;
  className?: string;
  images: ThemeImages;
};

export function ThemeLogoStatic({
  theme,
  logo: _logo = "logo",
  small = false,
  className,
  images,
}: ThemeLogoStaticProps) {
  let logo = _logo;
  const endsWithSmall = logo.endsWith("_small");
  if (small && !endsWithSmall) logo = (logo + "_small") as logoImageTypes;
  if (!images) return null;
  const fallbackType = (
    logo in images ? logo : "logo" + (small ? "_small" : "")
  ) as "logo";

  return (
    <PublicImage
      {...{
        ...images[fallbackType],
        alt: theme,
        className: className,
      }}
    />
  );
}
