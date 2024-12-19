import * as React from "react";
import { PublicImage } from "./PublicImage.js";

export type ImageStaticProps<
  Type extends ThemeImageType,
  Preference extends ThemeImagePreference<Type>
> = {
  name: Type;
  preference?: Preference;
  images: Record<Type, ThemeImages[Type]>;
  className?: string;
  alt?: string;
};

/**
 * Image component that uses the theme to get the image
 * @example ```tsx
 *  <Image name="logo" preference="special" />
 * // if logo_special is not available, fallback to logo
 * ```
 */
export function Image<
  Type extends ThemeImageType,
  Preference extends ThemeImagePreference<Type>
>({
  name,
  preference,
  className,
  alt,
  images,
}: ImageStaticProps<Type, Preference>) {
  const tryPreference = preference ? `${name}_${preference}` : name;
  const key =
    tryPreference in images ? (tryPreference as keyof typeof images) : name;
  const props = images[key];
  return <PublicImage className={className} {...props} alt={alt ?? name} />;
}
