import { transformName } from "./transformName";

export const levelPath = (levelName: string, width = 500) => {
  if(width !== 500 && width !== 250) width = 500
  return `/levelImages/${transformName(levelName)}-${width}.webp`;
}
