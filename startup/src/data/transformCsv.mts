import { safeSnakecase } from "../file/safeSnakecase.mjs";
import { CsvHeaders } from "./types.mjs";
import { formatDate } from "./formatDate.mjs";

export function transformCsv(val: string, header: CsvHeaders) {
  if (header === "tags") return val.split(",").map((v) => v.trim());
  if (header === "releaseDate")
    return { date: val, formatted: formatDate(new Date(val)) };
  if (header === "levelName" || header === "makerName")
    return { name: val, slug: safeSnakecase(val) };
  return val;
}
