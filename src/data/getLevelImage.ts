import * as levelImages from "./levelImages";
import { Theme } from "../theme/ThemeContext";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Images = UnionToIntersection<
  (typeof levelImages)[keyof typeof levelImages]
>;

type keys = keyof Images;
type normalKeys = Exclude<keys, `${string}_thumbnail`>;
type thumbnailKeys = `${normalKeys}_thumbnail`;

type getLevelImageFn = <T extends Theme, M extends string>(
  theme: T,
  levelName: M
) => M extends keyof Images ? Images[M] : Images[thumbnailKeys] | undefined;

export const getLevelImage: getLevelImageFn = (theme, levelName) =>
  levelImages[`_${theme}`][levelName as never];

type getLevelThumbnailFn = <T extends Theme, M extends string>(
  theme: T,
  levelName: normalKeys | M
) => M extends normalKeys
  ? Images[`${M}_thumbnail`]
  : `${M}${M}` extends `${M}`
    ? undefined | Images[thumbnailKeys]
    : never;

export const getLevelThumbnail: getLevelThumbnailFn = (theme, levelName) =>
  levelImages[`_${theme}`][`${levelName}_thumbnail` as never];

// const t1 = getLevelThumbnail("7mmc", 'cloudy_chasm');
// const t2 = getLevelThumbnail("7mmc", '' as string);
// const t3 = getLevelThumbnail("7mmc", 'stumping_to_conclusions');
