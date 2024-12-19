import sharp from "sharp";
import { aspectRatio } from "./faviconRatio.mjs";

/**
 * Creates a placeholder base64 string from the given resize options and sharp instance.
 */
export async function toPlaceholderBase64(
  job: ResizeJob,
  instance: sharp.Sharp
) {
  if (!job.userInfo.placeholder) return;
  try {
    const resize = aspectRatio({
      originalWidth: job.original.originalSize.width,
      originalHeight: job.original.originalSize.height,
      maxHeight: Math.sqrt(job.userInfo.resize?.height ?? 16),
      maxWidth: Math.sqrt(job.userInfo.resize?.width ?? 16),
    });
    const buffer = await instance
      .resize(resize)
      .toBuffer()
      .catch((e) => {
        console.trace(e);
        return undefined;
      });
    if (!buffer) {
      throw new Error(
        "Could not create placeholder buffer for " + job.output.file
      );
    }
    const string = buffer.toString("base64");
    if (!string)
      throw new Error(
        "Could not create placeholder base64 for " + job.output.file
      );
    return string;
  } catch (e) {
    console.trace(e);
  }
}
