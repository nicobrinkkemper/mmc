import * as React from "react";
import { PublicImage } from "./PublicImage.js";
/**
 * Image component that uses the theme to get the image
 * @example ```tsx
 *  <Image name="logo" preference="special" />
 * // if logo_special is not available, fallback to logo
 * ```
 */
export function Image({ name, preference, className, alt, images, }) {
    const tryPreference = preference ? `${name}_${preference}` : name;
    const key = tryPreference in images ? tryPreference : name;
    const props = images[key];
    return React.createElement(PublicImage, { className: className, ...props, alt: alt ?? name });
}
//# sourceMappingURL=Image.js.map