"use client";
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
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <img
      src={`${props.src ?? ""}`}
      srcSet={`${props.srcSet ?? ""}`}
      alt={alt ?? ""}
      width={width}
      height={height}
      style={{ opacity: loaded ? 1 : 0 }}
      className={className ?? ""}
      onLoad={handleLoad}
    />
  );
}
