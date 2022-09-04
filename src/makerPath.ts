import { transformName } from "./transformName";

export const makerPath = (makerName: string, width = 250) => {
  if (width !== 500 && width !== 250) width = 250;
  return `/makerImages/${transformName(makerName)}-${width}.webp`;
};
