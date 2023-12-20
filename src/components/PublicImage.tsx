import { SyntheticEvent, useCallback, useState } from "react";
import { useHref } from "react-router-dom";
import { SNAP } from "../constants";

type WidthOrHeight = { width: number, height?: 'auto' } | { width?: 'auto', height: number } | { width: number, height: number };

export const PublicImage = ({ alt, placeholder, width = "auto", height = "auto", ...props }: { alt: string, placeholder?: string } & WidthOrHeight) => {
  const [error, setError] = useState(!SNAP);
  const size = Number(width === 'auto' ? height : width);
  const doubleSize = size * 2;
  if (!(size in props)) {
    throw new Error(`Invalid size ${size} for ${JSON.stringify(props)}`);
  }
  const normal = '/' + props[size as keyof typeof props][0];
  const double = '/' + props[doubleSize as keyof typeof props][0];
  const base64 = "data:image/webp;base64, " + (placeholder ?? "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8efpkPQAHoALeTTZXEAAAAABJRU5ErkJggg==");
  const normalSrc = useHref(normal);
  const doubleSrc = useHref(double);
  const handleError = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    console.warn(
      `Failed to load image`,
      `srcset="${e.currentTarget.srcset}"`,
    );
    setError(true);
  }, []);

  return (
    <picture style={{
      maxWidth: width === 'auto' ? '100%' : width,
      maxHeight: height === 'auto' ? '100%' : height,
      background: (error) ? `url(${base64})` : undefined,
    }}>
      <img className={`image`}
        onError={handleError}
        src={normalSrc}
        srcSet={`${normalSrc} ${size}w, ${doubleSrc} ${doubleSize}w`}
        alt={alt}
        width={width}
        height={height}
      />
    </picture >
  );
}
