import { csvThemeMapper } from "../startup/csv/csvThemeMapper.mts";

// before we define the config, we take the chance to define the types we want from the csv and reuse elsewhere through-out the codebase
declare global {
  type CsvParseResult = ReturnType<typeof csvThemeMapper>;
  type ThemeLevelData = CsvParseResult & { images: LevelImages };

  type ThemeBatchProcessorFn = <T extends Theme = Theme>(
    themeConfig: Pick<ThemeConfig<T>, "theme" | "weekTrailers">,
    levelData: ThemeLevelData[],
    images: Pick<Images[T], "batch"> | null
  ) => {
    batches: ThemeBatch[];
    releaseDate: ThemeLevelData["releaseDate"];
  };

  type CsvReviver<H = string, V = any> = (
    value: string | number | boolean,
    header?: H,
    row?: number,
    col?: number
  ) => V;

  type ParseCsvFn = <
    Skip extends boolean,
    RowMode extends boolean,
    Typed extends boolean,
    Value extends Typed extends true
      ? RowMode extends true
        ? Record<string | number, any>
        : string | number
      : RowMode extends true
      ? Record<string, any>
      : string,
    Return
  >(
    csv: string,
    options: { typed?: Typed; skipHeaders: Skip; rowMode: RowMode },
    reviver: (row: Value) => Return
  ) => Return[];
}
export {};
