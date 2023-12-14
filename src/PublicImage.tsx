import { Suspense } from "react";
import { SuspenseImg } from "./SuspenseImage";
import { SNAP } from "./constants";
// A Resource is an object with a read method returning the payload


const imageInfo = {
  level: { width: 580, height: 326 },
  level_thumbnail: { width: 110, height: 110 },
  maker: { width: 180, height: 180 },
  logo_small: { width: "auto", height: 60 },
  logo: { width: "auto", height: 200 },
  logo_special: { width: "auto", height: 200 },
  illustration: { width: 220, height: "auto" },
} as const

type WidthOrHeight = { width: number, height?: 'auto' } | { width?: 'auto', height: number } | { width: number, height: number };


export const PublicImage = ({ name, type, placeholder, width = "auto", height = "auto", ...props }: { name: string, type: keyof typeof imageInfo, placeholder: string } & WidthOrHeight) => {
  const mode = width === 'auto' ? "max-height" : "max-width";
  const size = Number(width === 'auto' ? height : width);
  const doubleSize = size * 2;
  const normal = '/' + props[size as keyof typeof props];
  const double = '/' + props[doubleSize as keyof typeof props];
  const fallback = <img src={"data:image/webp;base64, " + placeholder}
    className={`${type}Img`}
    width={width}
    height={height}
    alt={name} style={{ color: 'rgba(0,0,0,0)', filter: "blur(8px)" }} />
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
          alt={name}
          width={width}
          height={height}
        /> : fallback}
      </Suspense>
    </picture >
  );
}
