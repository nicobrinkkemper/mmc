import { csvReviver } from "./csvReviver.js";

/**
 * Parse takes a string of CSV data and converts it to a 2 dimensional array
 *
 * options
 * - typed - infer types [false]
 *
 * @static
 * @param {string} csv the CSV string to parse
 * @param {Object} [options] an object containing the options
 * @param {Function} [reviver] a custom function to modify the values
 * @returns {Array} a 2 dimensional array of `[entries][values]`
 */
export function csvParse<
  const Skip extends boolean = false,
  const V extends Record<K, any> = any,
  const K extends string = string
>(
  csv: string,
  options?: { typed?: boolean; skipHeaders?: Skip },
  reviver: CsvReviver<string, V> = csvReviver as CsvReviver<string, { [key in keyof V]-?: V[key] }>
): Skip extends true 
  ? V 
  : [string[], ...V[]] {
  const ctx = Object.create(null);
  ctx.options = options || {};
  ctx.reviver = reviver;
  ctx.value = "";
  ctx.entry = [];
  ctx.output = [];
  ctx.col = 1;
  ctx.row = 1;
  ctx.headers = [];

  const lexer = /"|,|\r\n|\n|\r|[^",\r\n]+/y;
  const isNewline = /^(\r\n|\n|\r)$/;

  let matches: RegExpExecArray | null = null;
  let match = "";
  let state = 0;

  while ((matches = lexer.exec(csv)) !== null) {
    match = matches[0];

    switch (state) {
      case 0: // start of entry
        switch (true) {
          case match === '"':
            state = 3;
            break;
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            ctx.value += match;
            state = 2;
            break;
        }
        break;
      case 2: // un-delimited input
        switch (true) {
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            state = 4;
            throw Error(
              `CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`
            );
        }
        break;
      case 3: // delimited input
        switch (true) {
          case match === '"':
            state = 4;
            break;
          default:
            state = 3;
            ctx.value += match;
            break;
        }
        break;
      case 4: // escaped or closing delimiter
        switch (true) {
          case match === '"':
            state = 3;
            ctx.value += match;
            break;
          case match === ",":
            state = 0;
            valueEnd(ctx);
            break;
          case isNewline.test(match):
            state = 0;
            valueEnd(ctx);
            entryEnd(ctx);
            break;
          default:
            throw Error(
              `CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`
            );
        }
        break;
    }
  }

  // flush the last value
  if (ctx.entry.length !== 0) {
    valueEnd(ctx);
    entryEnd(ctx);
  }

  return ctx.output;
}

/** @private */
function valueEnd(ctx: {
  options: { typed?: boolean; skipHeaders?: boolean };
  value: string | number | boolean;
  entry: any;
  reviver: (
    v: string | number | boolean,
    header?: string | number | boolean,
    row?: number,
    col?: number
  ) => any;
  row: number;
  col: number;
  headers: (string | number | boolean)[];
}) {
  const value = ctx.options.typed ? inferType(ctx.value) : ctx.value;

  if (ctx.row === 1) {
    ctx.headers.push(String(value));
    if (!ctx.options.skipHeaders) {
      ctx.entry[ctx.col - 1] = value;
    }
  } else {
    const header = ctx.headers[ctx.col - 1];
    ctx.entry[header as string] = ctx.reviver(value, header, ctx.row, ctx.col);
  }

  ctx.value = "";
  ctx.col++;
}

/** @private */
function entryEnd(ctx: {
  output: any[];
  entry: any;
  row: number;
  col: number;
}) {
  if (Object.keys(ctx.entry).length > 0) {
    // Create a new object for each entry
    ctx.output.push({ ...ctx.entry });
  }
  ctx.entry = {};
  ctx.row++;
  ctx.col = 1;
}

/** @private */
function inferType(value: string | number | boolean) {
  const isNumber = /.\./;

  switch (true) {
    case value === "true":
    case value === "false":
      return value === "true";
    case isNumber.test(value as string):
      return parseFloat(value as string);
    case isFinite(value as never):
      return parseInt(value as string);
    default:
      return value;
  }
}
