import * as React from "react";
export type ImageStaticProps<Type extends ThemeImageType, Preference extends ThemeImagePreference<Type>> = {
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
export declare function Image<Type extends ThemeImageType, Preference extends ThemeImagePreference<Type>>({ name, preference, className, alt, images, }: ImageStaticProps<Type, Preference>): React.JSX.Element;
//# sourceMappingURL=Image.d.ts.map