
import { useMemo } from "react";
import data7mmc from "./data/7mmc.json";
import data8mmc from "./data/8mmc.json";
import { useTheme } from "./theme/useTheme";

const addDays = (date:Date, days:number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
const generateFromStartDate = (starDataStr:Date, amountOfWeeks: number)=>Array.from(Array(amountOfWeeks).keys()).map((index)=>{
  if (index === 0){
    return starDataStr;
  }
  return addDays(starDataStr, index * 7)
});

const data = {
  '7mmc': data7mmc,
  '8mmc': data8mmc,
}

const releaseDays = {
  '7mmc': (()=>{
    const days = generateFromStartDate(new Date("10 Sep 2022 00:00:00 GMT"), 6);
    return [
      days[0],
      days[1],
      days[2],
      days[3],
      days[4],
      addDays(days[5], 1) // this released later
    ]
  })(),
  '8mmc': (()=>{
    const days = generateFromStartDate(new Date("9 Dec 2023 00:00:00 GMT"), 1);
    return [
      days[0],
    ]
  })(),
}

const dateFirst=(a:Date, b:Date) => Date.now() - a.getTime() - (Date.now() - b.getTime());


// add any field here from the csv headers to make it a valid level value
export type levelRows = string[][];
export type level = ReturnType<typeof createLevel>;
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
  "levelCode"
}
const createLevel = (levelRow: string[], index?: number, arr?: string[][]) => ({
  order: parseCsvHeader(levelRow, "order", Number),
  batchNumber: parseCsvHeader(levelRow, "batchNumber", Number),
  levelName: parseCsvHeader(levelRow, "levelName", String),
  description: parseCsvHeader(levelRow, "description", String),
  makerDescription: parseCsvHeader(levelRow, "makerDescription", String),
  makerName: parseCsvHeader(levelRow, "makerName", String),
  makerId: parseCsvHeader(levelRow, "makerId", String),
  nationality: parseCsvHeader(levelRow, "nationality", String),
  progress: parseCsvHeader(levelRow, "progress", String),
  difficultyName: parseCsvHeader(levelRow, "difficultyName", String),
  genre: parseCsvHeader(levelRow, "Genre", String),
  gameStyle: parseCsvHeader(levelRow, "gameStyle", String),
  difficulty: parseCsvHeader(levelRow, "difficulty", Number),
  tags: parseCsvHeader(levelRow, "tags", String),
  levelCode: parseCsvHeader(levelRow, "levelCode", String),
  batchLength: Array.isArray(arr) ? levelRow.length : undefined,
  batchIndex: typeof index === "number" ? index : undefined
});

const parseCsvHeader = <H extends keyof typeof csvHeaders, T extends typeof String | typeof Number>(levelRow: string[], header: H, toType: T ): ReturnType<T> => {
  const contents = levelRow[csvHeaders[header]];
  if(!contents) {
    if(header === "difficulty") {
      const name = levelRow[csvHeaders['difficultyName']];
      if(name === 'Easy') return 1 as never;
      if(name === 'Normal') return 5 as never;
      if(name === 'Expert') return 8 as never;
      return 10 as never;
    }
    if(header === "tags") {
      return '' as never;
    }
    if(header === 'levelCode'){
      return 'Coming soon' as never;
    }
    if(header === 'nationality'){
      return 'US' as never;
    }
    if(header === 'makerDescription'){
      return 'Coming soon' as never;
    }
    if(header === 'makerName'){
      return 'Coming soon' as never;
    }
    if(header === 'description'){
      return 'Coming soon' as never;
    }
    throw new Error(`CSV HAS CHANGED: ${header} is missing`);
  }
  return toType(contents) as never;
}



export const isReleased = (releaseDay: Date) =>
  releaseDay.getTime() <= Date.now(); //

// utility function for components to use
const createBatchFinder = (levelRows: string[][]) => (batchNumber: number) => {
  if (typeof batchNumber !== "number")
    throw new TypeError(
      `batchNumber should be typeof number, got ${typeof batchNumber}`
    );
  return levelRows.filter(
    level => Number(level[csvHeaders["batchNumber"]]) === batchNumber
  );
};
const createLevelFinder = (levelRows: string[][]) => (order: number) => {
  if (typeof order !== "number")
    throw new TypeError(`order should be typeof number, got ${typeof order}`);
  return createLevel(
    levelRows.find(level => Number(level[csvHeaders["order"]]) === order) || []
  );
};
const createBatchLevelFinder =
  (createBatch: ReturnType<typeof createBatchFinder>) =>
  (batchNumber: number) => {
    if (typeof batchNumber !== "number")
      throw new TypeError(
        `batchNumber should be typeof number, got ${typeof batchNumber}`
      );
    return createBatch(batchNumber).map(createLevel);
  };

export const useLevelData = () => {
  const {theme} = useTheme();
  return useMemo(()=>{
    const [header, ...levelRows] = data[theme] as [
      keyof typeof csvHeaders,
      ...string[][]
    ];
    // here we do a check if all headers are still correct
    let i = 0;
    for (const head of header) {
      const v = csvHeaders[head as keyof typeof csvHeaders];
      if (!(typeof v === "number" && i === v)) {
        console.log(data);
        throw new Error(`CSV HAS CHANGED: stopped at ${v}`);
      }
      i++;
    }
    const releasedBatches = releaseDays[theme].filter(isReleased).sort(dateFirst);
    const newestBatch = releaseDays[theme].indexOf(
      releasedBatches[0]
    );
    const batch = createBatchFinder(levelRows);
    const level = createLevelFinder(levelRows);
    const levels = createBatchLevelFinder(batch);
    return {
      level,
      levels,
      batch,
      releaseDays: releaseDays[theme],
      startDate: releaseDays[theme][0],
      releasedBatches,
      newestBatch
    };
  }, [theme]);	
};
