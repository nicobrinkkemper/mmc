import { assertObject } from "../utils/pickAssert.js";

export const addLevelImages =
  (images: Pick<Images[Theme], "level" | "maker">) =>
  <T extends CsvParseResult>(row: T): T & { images: LevelImages } => {
    try {
      assertObject(images.level, [
        row.levelName.slug,
        row.levelName.thumbnailSlug,
      ]);
      assertObject(images.maker, [row.makerName.slug]);
    } catch (e) {
      console.warn(
        `No images for ${row.levelName.value}, batch: ${row.batchNumber}, order: ${row.order}`
      );
      throw e;
    }
    const levelImage = images.level[row.levelName.slug];
    const levelThumbnailImage = images.level[row.levelName.thumbnailSlug];
    const makerImage = images.maker[row.makerName.slug];
    return {
      ...row,
      images: {
        level: {
          width: levelImage.width,
          height: levelImage.height,
          aspectRatio: levelImage.aspectRatio,
          srcSet: levelImage.srcSet,
          src: levelImage.src,
          alt: `Level screenshot of ${row.levelName.value}`,
          className: row.makerName.slug + "_level",
        },
        levelThumbnail: {
          width: levelThumbnailImage.width,
          height: levelThumbnailImage.height,
          aspectRatio: levelThumbnailImage.aspectRatio,
          srcSet: levelThumbnailImage.srcSet,
          src: levelThumbnailImage.src,
          alt: `Level thumbnail of ${row.levelName.value}`,
          className: row.makerName.slug + "_thumbnail",
        },
        maker: {
          width: makerImage.width,
          height: makerImage.height,
          aspectRatio: makerImage.aspectRatio,
          srcSet: makerImage.srcSet,
          src: makerImage.src,
          alt: `Mii picture of: ${row.makerName.value}`,
          className: row.makerName.slug + "_maker",
        },
      },
    };
  };
