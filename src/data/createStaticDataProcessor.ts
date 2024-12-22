import { createBatchProcessor } from "./createBatchProcessor.js";
import { getThemePathInfo } from "./getThemePathInfo.js";

/**
 * Creates static data with processed batches and navigation
 */
export function createStaticDataProcessor<T extends Theme>(theme: T) {
  const batchProcessor = createBatchProcessor(theme);

  return (data: {
    levels: Array<ThemeCsv>;
    themeConfig: ThemeConfig;
    images: ThemeImages<T>;
  }) => {
    if (!data.themeConfig) {
      throw new Error("Theme config is required");
    }
    const pathInfo = getThemePathInfo(`/${theme}`);
    const batches = batchProcessor(
      data.levels,
      data.images[data.themeConfig.theme]
    );

    return {
      theme,
      pathInfo,
      themeConfig: data.themeConfig,
      images: data.images,
      batches,
      releaseDate: batches[0].releaseDate,
    };
  };
}
