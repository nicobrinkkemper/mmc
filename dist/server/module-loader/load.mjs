import { transformModuleIfNeeded } from "./transformModuleIfNeeded.mjs";
export async function load(url, context, defaultLoad) {
    const result = await defaultLoad(url, context, defaultLoad);
    if (result.format === "module") {
        if (typeof result.source !== "string") {
            throw new Error("Expected source to have been loaded into a string.");
        }
        const newSrc = await transformModuleIfNeeded(result.source, url, defaultLoad);
        return { format: "module", source: newSrc };
    }
    return result;
}
//# sourceMappingURL=load.mjs.map