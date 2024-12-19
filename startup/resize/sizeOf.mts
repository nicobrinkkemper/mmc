import { imageSize } from "image-size";
interface SizeOfProps {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}

function assertSize(
  result: SizeOfProps & {
    images?: SizeOfProps[];
  }
): asserts result is Size {
  if (!result) throw new Error(`no output from "image-size"`);
  if (typeof result.width !== "number" || isNaN(result.width))
    throw new Error(`no width from imageSize`);
  if (typeof result.height !== "number" || isNaN(result.height))
    throw new Error(`no height from imageSize`);
  if (!result.type) throw new Error(`no type from imageSize`);
}

/**
 * Get the size of an image
 * @param path - Path to the image
 * @returns The size of the image
 */
export function sizeOf(path: string) {
  try {
    const size = imageSize(path);
    assertSize(size);
    return size;
  } catch (error) {
    throw new Error(`Could not get size of ${path}: ${error}`);
  }
}
