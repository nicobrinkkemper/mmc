import { Suspense } from "react";
import { SuspenseImg } from "./SuspenseImage";
import { useTheme } from "./theme/useTheme";
import { transformName } from "./transformName";

const imageInfo = {
  level: { width: 580, height: 326, dir: 'level/' },
  level_thumbnail: { width: 110, height: 110, dir: 'level/' },
  maker: { width: 180, height: 180, dir: 'maker/' },
  logo_small: { width: "auto", height: 60, dir: '' },
  logo: { width: "auto", height: 200, dir: '' },
  logo_special: { width: "auto", height: 200, dir: '' },
  illustration: { width: 220, height: "auto", dir: '' },
} as const

export const PublicImage = ({ name, type }: { name: string, type: keyof typeof imageInfo }) => {
  const { themeSlug } = useTheme();
  const { width, height, dir } = imageInfo[type];
  const mode = width === 'auto' ? "max-height" : "max-width";
  const suffix = width === 'auto' ? height : width;
  const base = `/${themeSlug}/${dir}${transformName(name)}`;
  const preload = `${base}-${suffix * 0.1}.webp`;
  const normal = `${base}-${suffix}.webp`;
  const double = `${base}-${suffix * 2}.webp`;
  return (
    <picture className={`${type}Picture`} style={{ display: 'flex' }}>
      <Suspense fallback={<img src={preload}
        width={width}
        height={height} className={`${type}Img loading`} alt={'Loading ' + name} style={{ color: 'rgba(0,0,0,0)', filter: "blur(64px)" }} />}>
        <SuspenseImg
          className={`${type}Img`}
          src={preload}
          srcSet={`${normal} ${suffix}w, ${double} ${suffix * 2}w`}
          sizes={`(${mode}: ${suffix}px) ${suffix}px, ${suffix * 2}px`}
          alt={name}
          width={width}
          height={height}
        />
      </Suspense>
    </picture >
  );
}
