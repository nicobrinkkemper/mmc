import * as makerImages from "./makerImages";
import { Theme } from "../theme/ThemeContext";

type Maker = (typeof makerImages)[`_${Theme}`];
type MakerKey = keyof Maker;
type getMakerImageFn = <T extends Theme, M extends string>(
  theme: T,
  makerName: M | MakerKey
) => M extends MakerKey
  ? { [k in keyof Maker[M]]: Maker[M][k] }
  : `${M}` extends `${M}${M}`
    ? { [k in keyof Maker[keyof Maker]]: Maker[keyof Maker][k] } | undefined
    : never;

export const getMakerImage: getMakerImageFn = (theme, makerName) => {
  return makerImages[`_${theme}`][makerName as never];
};

// const t1 = getMakerImage("7mmc", "paxsman");
// const t1: {
//   "180": string[];
//   "360": string[];
//   placeholder: string;
//   width: number;
//   height: number;
// }
