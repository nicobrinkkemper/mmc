/**
 * Asserts that the required image properties exist for a theme's level images
 * @param images - The images object to check
 * @param levelSlug - The level slug to verify
 * @param makerSlug - The maker slug to verify
 */
export function assertThemeLevelImages(
  images: any,
  levelSlug: string,
  makerSlug: string
): asserts images is Record<string, Images[Theme]> {
  if (!images) {
    throw new Error("images is undefined");
  }

  // Check maker image exists
  if (!images.maker?.[makerSlug]?.src) {
    throw new Error(`Missing maker image for: ${makerSlug}`);
  }

  // Check level images exist
  if (!images.level?.[levelSlug]?.src) {
    throw new Error(`Missing level image for: ${levelSlug}`);
  }

  // Check thumbnail exists
  if (!images.level?.[`${levelSlug}_thumbnail`]?.src) {
    throw new Error(`Missing thumbnail for level: ${levelSlug}`);
  }
}
