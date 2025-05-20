// added this to fix a bug with the "markdown-to-jsx" dependency we are using here. The namespace changed from JSX to React.JSX
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

import { trim } from "lodash-es";

import { compiler } from "markdown-to-jsx";
import { assertObject } from "../../src/utils/pickAssert.js";
import { safeSnakecase } from "../../src/utils/safeSnakecase.js";
import { createMapper } from "./createMapper.js";
/**
 * This mapper is used to transform the CSV data into a format that is easier to work with.
 *
 * The interesting bit is the jsx transformation of the makerDescription field,
 * which requires to be wrapped in <CompileJsx> tags. This allows the markdown support,
 * while not relying too much on the markdown-to-jsx library itself.
 *
 * you can add any header to the csv and create a mapper for it here.
 */
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
      formatted: new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      }).format(new Date(val)),
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
    // no final transformation is needed here, but we can potentially add some here
    return row;
  },
});
