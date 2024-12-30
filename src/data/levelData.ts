import { addLevelImages } from "./addLevelImages.js";
import { batchProcessor } from "./batchProcessor.js";
import { csvParse } from "./csvParse.js";
import { csvThemeMapper } from "./csvThemeMapper.js";

/**
 * In goes a structured format of all the images, out comes the data that will be saved to /src/data/themes.json
 */
export const levelData = <T extends Theme = Theme>(
  { theme, weekTrailers }: Pick<ThemeConfig<T>, "theme" | "weekTrailers">,
  { level, maker, batch }: Pick<Images[T], "level" | "maker" | "batch">,
  csv: string
) => {
  const parseResult = csvParse(
    csv,
    {
      skipHeaders: true,
      rowMode: true,
    },
    csvThemeMapper
  );
  const unbatchedLevelData: ThemeLevelData[] = parseResult.map(
    addLevelImages({
      level,
      maker,
    })
  );
  const levelData = batchProcessor(
    { theme, weekTrailers },
    unbatchedLevelData,
    { batch }
  );
  return levelData;
};
