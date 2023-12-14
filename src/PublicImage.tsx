import { Suspense } from "react";
import { SuspenseImg } from "./SuspenseImage";
import { SNAP } from "./constants";

export type imageType =
  | 'level'
  | 'level_thumbnail'
  | 'maker'
  | 'logo_small'
  | 'logo'
  | 'logo_special'
  | 'illustration'

type WidthOrHeight = { width: number, height?: 'auto' } | { width?: 'auto', height: number } | { width: number, height: number };

export const PublicImage = ({ alt, type, placeholder, width = "auto", height = "auto", ...props }: { alt: string, type: imageType, placeholder: string } & WidthOrHeight) => {
  const mode = width === 'auto' ? "max-height" : "max-width";
  const size = Number(width === 'auto' ? height : width);
  const doubleSize = size * 2;
  const normal = '/' + props[size as keyof typeof props];
  const double = '/' + props[doubleSize as keyof typeof props];
  const fallback = <img src={"data:image/webp;base64, " + placeholder}
    className={`${type}Img`}
    width={width}
    height={height}
    alt={alt} style={{ color: 'rgba(0,0,0,0)', filter: "blur(8px)" }} />
  return (
    <picture className={`${type}Picture`} style={{ display: 'flex' }}>
      <Suspense fallback={
        // base64 image tag
        fallback
      }>
        {SNAP ? <SuspenseImg
          className={`${type}Img`}
          src={double}
          srcSet={`${normal} ${size}w, ${double} ${doubleSize}w`}
          sizes={`(${mode}: ${size}px) ${size}px, ${doubleSize}px`}
          alt={alt}
          width={width}
          height={height}
        /> : fallback}
      </Suspense>
    </picture >
  );
}
