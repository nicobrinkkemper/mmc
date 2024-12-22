import { createMapper } from "./createMapper.js";
import { getLevelPathInfo } from "./getLevelPathInfo.js";
import { safeSnakecase } from "./safeSnakecase.mjs";

const trim = (val: string) =>
  typeof val === "string" ? val.trim() : String(val);

export const csvThemeMappers = <
  T extends Theme = Theme,
  I extends ThemeImages<T> = ThemeImages<T>
>(
  theme: T,
  images: I
) => {
  if (!(theme in images)) {
    throw new Error("No images found for theme " + theme);
  }
  return createMapper({
    mappers: {
      order: String,
      batchNumber: String,
      levelName: String,
      makerName: String,
      description: trim,
      makerDescription: trim,
      tags: (val) => (val ? val.split(",").map(trim) : []),
      nationality: String,
      difficulty: Number,
      difficultyName: String,
      releaseDate: String,
    },
    transform: (row, _index) => ({
      levelName: row.levelName,
      makerName: row.makerName,
      description: row.description,
      makerDescription: row.makerDescription,
      tags: row.tags,
      nationality: row.nationality,
      difficulty: row.difficulty,
      difficultyName: row.difficultyName,
      pathInfo: getLevelPathInfo(
        `/${theme}/level/${row.batchNumber}/${row.order}`
      ),
      params: {
        batchNumber: row.batchNumber,
        order: row.order,
      },
      images: {
        level: images[theme].level[safeSnakecase(row.levelName)],
        levelThumbnail: images[theme].level[safeSnakecase(row.levelName)],
        maker: images[theme].maker[safeSnakecase(row.makerName)],
      },
    }),
  });
};
