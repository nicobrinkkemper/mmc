import { useHref } from "react-router-dom";

type WidthOrHeight = { width: number, height?: 'auto' } | { width?: 'auto', height: number } | { width: number, height: number };

export const PublicImage = ({ alt, placeholder, width = "auto", height = "auto", ...props }: { alt: string, placeholder?: string } & WidthOrHeight) => {
  const size = Number(width === 'auto' ? height : width);
  const doubleSize = size * 2;
  if (!(size in props)) {
    throw new Error(`Invalid size ${size} for ${JSON.stringify(props)}`);
  }
  const normal = '/' + props[size as keyof typeof props][0];
  const double = '/' + props[doubleSize as keyof typeof props][0];
  const base64 = "data:image/webp;base64, " + placeholder;
  const normalSrc = useHref(normal);
  const doubleSrc = useHref(double);

  return (
    <picture style={{
      maxWidth: width === 'auto' ? '100%' : width,
      maxHeight: height === 'auto' ? '100%' : height,
    }}>
      <source type="image/webp" srcSet={`${normalSrc} ${size}w, ${doubleSrc} ${doubleSize}w`} />
      <img className={`image`} loading="lazy"
        src={base64}
        alt={alt}
        width={width}
        height={height}
      />
    </picture >
  );
}
