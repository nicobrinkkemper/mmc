import * as React from "react";

export function PublicImage({
  alt,
  width,
  height,
  className,
  ...props
}: Readonly<
  Pick<
    ImageStructure,
    "alt" | "className" | "width" | "height" | "src" | "srcSet"
  >
>) {
  return (
    <img
      src={`${props.src ?? ""}`}
      srcSet={`${props.srcSet ?? ""}`}
      alt={alt ?? ""}
      width={width}
      height={height}
      className={className ?? ""}
      style={{ opacity: 1 }}
    />
  );
}
