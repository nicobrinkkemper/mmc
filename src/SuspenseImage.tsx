import { ImgHTMLAttributes } from "react";

const imgCache = {
  __cache: {} as Record<string, Promise<void> | boolean>,
} as const;
const read = (src: string) => {
  if (!imgCache.__cache[src]) {
    imgCache.__cache[src] = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        imgCache.__cache[src] = true;
        resolve(imgCache.__cache[src]);
      };
      img.src = src;
    }).then((img) => {
      imgCache.__cache[src] = true;
    });
  }
  if (imgCache.__cache[src] instanceof Promise) {
    throw imgCache.__cache[src];
  }
  return imgCache.__cache[src];
};

export const SuspenseImg = ({ src, alt = '', ...rest }: ImgHTMLAttributes<{}>) => {
  if (typeof src === "string") read(src);
  return <img alt={alt} src={src} {...rest} />;
};
