export function PublicImage({
  alt,
  width,
  height,
  className,
  ...props
}: Readonly<{
  alt: string;
  className?: string;
  width: number;
  height: number;
  srcSet: string;
  src: string;
}>) {
  return (
    <picture
      className={className}
      style={{
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
    >
      <img
        className={"image"}
        src={props.src}
        srcSet={props.srcSet}
        alt={alt}
        width={width}
        height={height}
      />
    </picture>
  );
}
