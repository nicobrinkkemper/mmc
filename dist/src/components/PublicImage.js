import * as React from "react";
export function PublicImage({ alt, width, height, className, ...props }) {
    return (React.createElement("img", { className: className, src: props.src, srcSet: props.srcSet, alt: alt, width: width, height: height }));
}
//# sourceMappingURL=PublicImage.js.map