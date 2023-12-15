

type WidthOrHeight = { width: number, height?: 'auto' } | { width?: 'auto', height: number } | { width: number, height: number };

export const PublicImage = ({ alt, placeholder, width = "auto", height = "auto", ...props }: { alt: string, placeholder: string } & WidthOrHeight) => {
  const size = Number(width === 'auto' ? height : width);
  const doubleSize = size * 2;
  const normal = '/' + props[size as keyof typeof props];
  const double = '/' + props[doubleSize as keyof typeof props];
  const base64 = "data:image/webp;base64, " + placeholder;
  return (
    <picture>
      <source type="image/webp" srcSet={`${normal} ${size}w, ${double} ${doubleSize}w`} />
      <img className={`image`} loading="lazy"
        src={base64}
        alt={alt}
        width={width}
        height={height}
      />
    </picture >
  );
}
