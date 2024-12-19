import { formatDate } from "./formatDate.mjs";
import { safeSnakecase } from "./safeSnakecase.mjs";
export function transformCsv(val, header) {
    if (header === "tags") {
        const tags = Object.fromEntries(val
            .split(",")
            .map((v) => v.trim())
            .map((v) => {
            if (!v)
                return undefined;
            const cased = safeSnakecase(v);
            if (!cased)
                return undefined;
            return [safeSnakecase(v), v];
        })
            .filter((v) => v !== undefined && v !== null));
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
        return val.trim();
    }
    return val;
}
//# sourceMappingURL=transformCsv.mjs.map