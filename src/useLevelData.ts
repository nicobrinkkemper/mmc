import { useMemo } from "react";
import data7mmc from "./data/7mmc.json";
import data8mmc from "./data/8mmc.json";
import { useTheme } from "./theme/useTheme";
import { themeKeys } from "./theme/ThemeContext";

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
const generateFromStartDate = (starDataStr: Date, amountOfWeeks: number) =>
  Array.from(Array(amountOfWeeks).keys()).map((index) => {
    if (index === 0) {
      return starDataStr;
    }
    return addDays(starDataStr, index * 7);
  });

const data = {
  "7mmc": data7mmc,
  "8mmc": data8mmc,
};

const releaseDays = {
  "7mmc": (() => {
    const days = generateFromStartDate(new Date("10 Sep 2022 04:00:00 GMT"), 6);
    return [
      days[0],
      days[1],
      days[2],
      days[3],
      days[4],
      addDays(days[5], 1), // this released later
    ];
  })(),
  "8mmc": (() => {
    const days = generateFromStartDate(new Date("9 Dec 2023 04:00:00 GMT"), 1);
    return [days[0]];
  })(),
};

const dateFirst = (a: Date, b: Date) =>
  Date.now() - a.getTime() - (Date.now() - b.getTime());

// add any field here from the csv headers to make it a valid level value
export type levelRows = string[][];
export type level = ReturnType<typeof parseLevelData>;
/** this is just a copy of the first row of the CSV. If you see "CSV HAS CHANGED" error, you probably need to change this enum */
//order,batchNumber,levelName,makerName,discordName,makerId,briefDescription,progress,difficultyName,gameStyle,mainTheme,subTheme,clearCondition,averageClearTime,description,makerDescription,difficulty,tags,nationality,levelCode,5YMMor7MMC

enum csvHeaders {
  "order",
  "batchNumber",
  "levelName",
  "makerName",
  "discordName",
  "makerId",
  "briefDescription",
  "progress",
  "difficultyName",
  "gameStyle",
  "Genre",
  "Music?",
  "mainTheme",
  "subTheme",
  "clearCondition",
  "averageClearTime",
  "description",
  "makerDescription",
  "difficulty",
  "tags",
  "nationality",
  "levelCode",
}

const parseLevelData = (
  levelRow: string[],
  index?: number,
  arr?: string[][]
) => ({
  order: parseCsvHeader(levelRow, "order", Number, index),
  batchNumber: parseCsvHeader(levelRow, "batchNumber", Number, 1),
  levelName: parseCsvHeader(
    levelRow,
    "levelName",
    String,
    "Level name coming soon"
  ),
  description: parseCsvHeader(
    levelRow,
    "description",
    String,
    "Description coming soon"
  ),
  makerDescription: parseCsvHeader(
    levelRow,
    "makerDescription",
    String,
    "Maker description coming soon"
  ),
  makerName: parseCsvHeader(
    levelRow,
    "makerName",
    String,
    "Maker name coming soon"
  ),
  makerId: parseCsvHeader(levelRow, "makerId", String, "Maker ID coming soon"),
  nationality: parseCsvHeader(levelRow, "nationality", String, "us"),
  progress: parseCsvHeader(levelRow, "progress", String, "100%"),
  difficultyName: parseCsvHeader(levelRow, "difficultyName", String, "Expert"),
  genre: parseCsvHeader(levelRow, "Genre", String, "Platformer"),
  gameStyle: parseCsvHeader(levelRow, "gameStyle", String, "SMB1"),
  difficulty: parseCsvHeader(
    levelRow,
    "difficulty",
    Number,
    (() => {
      const name = levelRow[csvHeaders["difficultyName"]];
      if (name === "Easy") return 1 as never;
      if (name === "Normal") return 5;
      if (name === "Expert") return 8;
      return 10;
    })()
  ),
  tags: parseCsvHeader(levelRow, "tags", String, ""),
  levelCode: parseCsvHeader(
    levelRow,
    "levelCode",
    String,
    "Level code coming soon"
  ),
  batchLength: Number(levelRow?.length),
  batchIndex: Number(index),
});

const parseCsvHeader = <
  H extends keyof typeof csvHeaders,
  T extends StringConstructor | NumberConstructor,
>(
  levelRow: string[],
  header: H,
  parse: T,
  defaultType?: ReturnType<T>
): ReturnType<T> => {
  const contents = levelRow[csvHeaders[header]];
  if (!contents) return defaultType as never;
  return parse(contents) as never;
};

export const isReleased = (releaseDay: Date) =>
  releaseDay.getTime() <= Date.now(); //

// utility function for components to use
const createBatchFinder = (levelRows: string[][]) => (batchNumber: number) => {
  if (typeof batchNumber !== "number")
    throw new TypeError(
      `batchNumber should be typeof number, got ${typeof batchNumber}`
    );
  return levelRows.filter(
    (level) => Number(level[csvHeaders["batchNumber"]]) === batchNumber
  );
};

const parseLevelDataFinder = (levelRows: string[][]) => (order: number) => {
  if (typeof order !== "number")
    throw new TypeError(`order should be typeof number, got ${typeof order}`);
  return parseLevelData(
    levelRows.find((level) => Number(level[csvHeaders["order"]]) === order) ??
      []
  );
};
const createBatchLevelFinder =
  (createBatch: ReturnType<typeof createBatchFinder>) =>
  (batchNumber: number) => {
    if (typeof batchNumber !== "number")
      throw new TypeError(
        `batchNumber should be typeof number, got ${typeof batchNumber}`
      );
    return createBatch(batchNumber).map(parseLevelData);
  };

const levelData = (theme: keyof typeof data) => {
  const [header, ...levelRows] = data[theme] as [
    keyof typeof csvHeaders,
    ...string[][],
  ];
  // here we do a check if all headers are still correct
  let i = 0;
  for (const head of header) {
    if (!head) {
      console.warn(
        `Head missing at index ${i} is missing, between ${header[i - 1]} and ${
          header[i + 1]
        }`
      );
      continue;
    }
    const v = csvHeaders[head as keyof typeof csvHeaders];
    if (!(typeof v === "number" && i === v)) {
      console.log(data);
      throw new Error(`CSV HAS CHANGED: stopped at ${i} ${v}`);
    }
    i++;
  }
  const releasedBatches = releaseDays[theme].filter(isReleased).sort(dateFirst);
  const newestBatch = releaseDays[theme].indexOf(releasedBatches[0]);
  const batch = createBatchFinder(levelRows);
  const level = parseLevelDataFinder(levelRows);
  const levels = createBatchLevelFinder(batch);

  return {
    level,
    levels,
    batch,
    releaseDays: releaseDays[theme],
    startDate: releaseDays[theme][0],
    releasedBatches,
    newestBatch,
  };
};

const themeData = Object.assign(
  {},
  ...themeKeys.map((k) => ({ [k]: levelData(k) }))
) as {
  [k in keyof typeof data]: ReturnType<typeof levelData>;
};

export const useLevelData = () => {
  const { theme } = useTheme();
  return useMemo(() => {
    const [header, ...levelRows] = data[theme] as [
      keyof typeof csvHeaders,
      ...string[][],
    ];
    // here we do a check if all headers are still correct
    let i = 0;
    for (const head of header) {
      if (!head) {
        console.warn(
          `Head missing at index ${i} is missing, between ${
            header[i - 1]
          } and ${header[i + 1]}`
        );
        continue;
      }
      const v = csvHeaders[head as keyof typeof csvHeaders];
      if (!(typeof v === "number" && i === v)) {
        console.log(data);
        throw new Error(`CSV HAS CHANGED: stopped at ${i} ${v}`);
      }
      i++;
    }
    const releasedBatches = releaseDays[theme]
      .filter(isReleased)
      .sort(dateFirst);
    const newestBatch = releaseDays[theme].indexOf(releasedBatches[0]);
    const batch = createBatchFinder(levelRows);
    const level = parseLevelDataFinder(levelRows);
    const levels = createBatchLevelFinder(batch);

    return {
      level,
      levels,
      batch,
      releaseDays: releaseDays[theme],
      startDate: releaseDays[theme][0],
      releasedBatches,
      newestBatch,
    };
  }, [theme]);
};
