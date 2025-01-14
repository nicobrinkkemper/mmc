/**
 * Calculates the aspect ratio of an image, which can be used to create a favicon.
 */
export function aspectRatio({
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight,
}: {
  originalWidth: number;
  originalHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}) {
  if (maxWidth && !maxHeight)
    maxHeight = (originalHeight / originalWidth) * maxWidth; // = new height;
  if (!maxWidth && maxHeight)
    maxWidth = (originalWidth / originalHeight) * maxHeight; // = new width;
  if (!maxWidth || isNaN(maxWidth))
    console.warn(
      `Could not create aspect ratio, no maxWidth. ${originalWidth}x${originalHeight} ${maxWidth}x${maxHeight}`
    );
  if (!maxHeight || isNaN(maxHeight))
    console.warn(
      `Could not create aspect ratio, no maxHeight. ${originalWidth}x${originalHeight} ${maxWidth}x${maxHeight}`
    );
  const ratio = Math.min(
    (maxWidth ?? 1) / originalWidth,
    (maxHeight ?? 1) / originalHeight
  );
  return {
    width: Math.round(Math.round(originalWidth * ratio * 100) / 100),
    height: Math.round(Math.round(originalHeight * ratio * 100) / 100),
  };
}
