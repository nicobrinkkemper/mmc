import { createBatchProcessor } from "./createBatchProcessor.js";
import { csvParse } from "./csvParse.js";
import { csvThemeMappers } from "./csvThemeMappers.js";

export function csvToThemeStaticData(
  themeConfig: ThemeConfig,
  csv: string,
  images: ThemeImages
) {
  const { theme } = themeConfig;
  // ... validation checks

  const themeMapper = csvThemeMappers(theme, images);
  const batchProcessor = createBatchProcessor(theme);

  const levels = csvParse(csv, { skipHeaders: true }, themeMapper);
  if (!Array.isArray(levels)) {
    throw new Error("Levels is not an array");
  }
  return {
    theme,
    themeConfig,
    images: images[theme],
    batches: batchProcessor(levels, images[theme]), // Convert single level to array
  };
}
