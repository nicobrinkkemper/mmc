import * as React from "react";
import { PublicImage } from "../components/PublicImage.js";

type ThemeLogoType = ThemeComponent<{
  images: pickOptional<["logo", "logo_simple", "logo_special"]>;
  type: optional;
  small: optional;
}>;

export const ThemeLogoStatic: ThemeLogoType = ({ images, type, small }) => {
  const logoType = small ? "simple" : type ?? "normal";
  const versions =
    logoType === "normal"
      ? "logo" in images && images["logo"]
        ? images["logo"]
        : []
      : logoType === "special"
      ? "logo_special" in images && images["logo_special"]
        ? images["logo_special"]
        : "logo" in images && images["logo"]
        ? images["logo"]
        : []
      : logoType === "simple"
      ? "logo_simple" in images && images["logo_simple"]
        ? images["logo_simple"]
        : "logo" in images && images["logo"]
        ? images["logo"]
        : []
      : [];
  if (!versions.length) {
    console.log("No images for ThemeLogoStatic", images);
    return null;
  }
  return <PublicImage {...versions[0]} />;
};
