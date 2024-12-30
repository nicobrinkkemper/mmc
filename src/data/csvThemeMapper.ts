declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

import { trim } from "lodash-es";

import { compiler } from "markdown-to-jsx";
import { assertObject } from "../utils/pickAssert.js";
import { safeSnakecase } from "../utils/safeSnakecase.js";
import { createMapper } from "./createMapper.js";

export const csvThemeMapper = createMapper({
  mappers: {
    order: String,
    batchNumber: String,
    levelName: (val) => ({
      value: val,
      slug: safeSnakecase(val),
      thumbnailSlug: `${safeSnakecase(val)}_thumbnail` as const,
    }),
    makerName: (val) => ({
      value: val,
      slug: safeSnakecase(val),
    }),
    description: trim,
    makerDescription: (val) => (val ? compiler(val.trim()) : ""),
    tags: (val) => (val ? val.split(",").map(trim) : []),
    nationality: String,
    difficulty: Number,
    difficultyName: String,
    releaseDate: (val) => ({
      value: val,
      date: new Date(val),
      isUnreleased: Date.now() < new Date(val).getTime(),
    }),
    levelCode: String,
    makerId: String,
    batchName: String,
    batchDescription: String,
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
      console.log(
        "No maker description for",
        row.makerName.value,
        row.levelName.value
      );
    }
    return {
      order: row.order,
      batchNumber: row.batchNumber,
      levelName: row.levelName,
      makerName: row.makerName,
      levelCode: row.levelCode,
      makerId: row.makerId,
      description: row.description,
      makerDescription: row.makerDescription,
      tags: row.tags,
      nationality: row.nationality,
      difficulty: row.difficulty,
      difficultyName: row.difficultyName,
      releaseDate: row.releaseDate,
      batchName: row.batchName,
      batchDescription: row.batchDescription,
    };
  },
});
