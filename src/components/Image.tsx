import { type ThemeContextImages } from "../theme/ThemeContext";
import { useTheme } from "../theme/useTheme";
import { PublicImage } from "./PublicImage";

// from a intersection of object types, get all the keys
type KeysOfIntersection<T> = T extends T ? keyof T : never;

// these images might exists depending on the theme
type ThemeImages = KeysOfIntersection<ThemeContextImages>;

// the most basic images are the ones that are always there
type ThemeImageNames = Exclude<ThemeImages, `${string}_${string}`>;

// get part behind the underscore
type ThemeImagePreference<T extends string> = T extends `${string}_${infer U}`
  ? U
  : never;

/**
 * Image component that uses the theme to get the image
 * @example ```tsx
 *  <Image name="logo" preference="special" />
 * // if logo_special is not available, fallback to logo
 * ```
 */
export function Image<
  Name extends ThemeImageNames,
  Preference extends ThemeImagePreference<Name>,
>({
  name,
  preference,
  className,
  alt,
}: {
  readonly name: Name;
  readonly preference?: Preference;
  readonly className?: string;
  readonly alt?: string;
}) {
  const { data } = useTheme();
  const tryPreference = preference ? `${name}_${preference}` : name;
  const key =
    tryPreference in data.images
      ? (tryPreference as keyof typeof data.images)
      : name;
  const props = data.images[key];
  return <PublicImage className={className} {...props} alt={alt ?? name} />;
}
