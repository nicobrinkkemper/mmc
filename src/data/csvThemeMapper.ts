import { trim } from "lodash-es";
import { assertObject } from "../utils/pickAssert.js";
import { safeSnakecase } from "../utils/safeSnakecase.js";
import { createMapper } from "./createMapper.js";
import { getThemePathInfo } from "./getThemePathInfo.js";

export const csvThemeMapper = createMapper({
  mappers: {
    order: String,
    batchNumber: String,
    levelName: (val) => ({
      value: val,
      thumnailName: `${val}_thumbnail`,
      slug: safeSnakecase(val),
      thumbnailSlug: `${safeSnakecase(val)}_thumbnail` as const,
    }),
    makerName: (val) => ({
      value: val,
      slug: safeSnakecase(val),
    }),
    description: trim,
    makerDescription: trim,
    tags: (val) => (val ? val.split(",").map(trim) : []),
    nationality: String,
    difficulty: Number,
    difficultyName: String,
    releaseDate: (val) => ({
      formatted: val,
      date: new Date(val),
      isUnreleased: Date.now() < new Date(val).getTime(),
    }),
    levelCode: String,
    makerId: String,
  },
  transform: (row) => {
    assertObject(row, [
      "order",
      "batchNumber",
      "levelName",
      "makerName",
      "description",
      "tags",
      "nationality",
      "difficulty",
      "difficultyName",
      "releaseDate",
      "levelCode",
      "makerId",
    ]);
    if (!row.makerDescription) {
      console.log("Forgot to add maker description for", row.makerName);
    }
    return {
      levelName: row.levelName,
      makerName: row.makerName,
      levelCode: row.levelCode,
      makerId: row.makerId,
      description: row.description,
      makerDescription: !row.makerDescription ? "" : row.makerDescription,
      tags: row.tags,
      nationality: row.nationality,
      difficulty: row.difficulty,
      difficultyName: row.difficultyName,
      releaseDate: row.releaseDate,
      params: {
        batchNumber: row.batchNumber,
        order: row.order,
      },
      pathInfo: ({ theme }: Pick<ThemeConfig, "theme">) =>
        getThemePathInfo(`/${theme}/level/${row.batchNumber}/${row.order}`),
      images: (images: {
        level: Record<string, ResizedLevelImage>;
        maker: Record<string, ResizedLevelMakerImage>;
      }) => {
        try {
          assertObject(images.level, [
            row.levelName.slug,
            row.levelName.thumbnailSlug,
          ]);
          assertObject(images.maker, [row.makerName.slug]);
        } catch (e) {
          console.log(
            `No images for ${row.levelName.value}, batch: ${row.batchNumber}, order: ${row.order}`
          );
          throw e;
        }
        return {
          level: images.level[row.levelName.slug][580][0],
          levelThumbnail: images.level[row.levelName.thumbnailSlug][110][0],
          maker: images.maker[row.makerName.slug][180][0],
        };
      },
    };
  },
});
