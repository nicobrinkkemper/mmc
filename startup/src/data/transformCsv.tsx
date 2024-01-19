import { compiler } from "markdown-to-jsx";
import { safeSnakecase } from "../file/safeSnakecase.mjs";
import { formatDate } from "./formatDate.mjs";
import { CsvHeaders } from "./types.mjs";
export function transformCsv(val: string, header: CsvHeaders) {
  if (header === "tags") {
    const tags = Object.fromEntries(
      val
        .split(",")
        .map((v) => v.trim())
        .map((v) => {
          if (!v) return undefined;
          const cased = safeSnakecase(v);
          if (!cased) return undefined;
          return [safeSnakecase(v), v];
        })
        .filter((v): v is [string, string] => v !== undefined && v !== null)
    );
    if (Object.keys(tags).length === 0)
      return [
        {
          bonus: "Bonus",
        },
      ];

    return tags;
  }
  if (header === "releaseDate")
    return { date: val.trim(), formatted: formatDate(new Date(val)) };
  if (header === "levelName" || header === "makerName")
    return { name: val.trim(), slug: safeSnakecase(val.trim()) };
  if (header === "makerDescription" || header === "description") {
    // precompiled markdown JSX https://github.com/quantizor/markdown-to-jsx
    // trim is important because spaces at the end cause hydration mismatches
    return compiler(val.trim());
  }
  return val;
}
