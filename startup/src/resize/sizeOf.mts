import { imageSize } from "image-size";
import { Size } from "./types.mjs";
interface ISize {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}
interface ISizeCalculationResult extends ISize {
  images?: ISize[];
}

function validateOriginalSize(
  result: ISizeCalculationResult
): asserts result is Size {
  if (!result) throw new Error(`no output from imageSize`);
  if (typeof result.width !== "number" || isNaN(result.width))
    throw new Error(`no width from imageSize`);
  if (typeof result.height !== "number" || isNaN(result.height))
    throw new Error(`no height from imageSize`);
  if (!result.type) throw new Error(`no type from imageSize`);
}

export function sizeOf(path: string) {
  try {
    const size = imageSize(path);
    validateOriginalSize(size);
    return size;
  } catch (error) {
    throw new Error(`Could not get size of ${path}: ${error}`);
  }
}
