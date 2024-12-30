import { csvThemeMapper } from "../src/data/csvThemeMapper.ts";

// before we define the config, we take the change to define the types we want from the csv and reuse elsewhere throughout the codebase
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

  /*
  export function csvParse<
  const Skip extends boolean = false,
  const RowMode extends boolean = false,
  const Value extends RowMode extends true ? Record<string, unknown> : string = RowMode extends true ? Record<string, unknown> : string,
  const Reviver extends RowMode extends true ? (row: Value) => any : (value: string) => any = RowMode extends true ? (row: Value) => Value : (value: string) => string
>(
  csv: string,
  options?: { typed?: boolean; skipHeaders?: Skip; rowMode?: RowMode },
  reviver: Reviver = ((value: Value) => value) as Reviver
): Skip extends true 
  ? ReturnType<Reviver>[] 
  : [ReturnType<Reviver>[], ...ReturnType<Reviver>[]] {
  const ctx = Object.create(null);
    */
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

