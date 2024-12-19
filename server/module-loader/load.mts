import { transformModuleIfNeeded } from "./transformModuleIfNeeded.mjs";

export async function load(
  url: string,
  context: LoadContext,
  defaultLoad: LoadFunction
): Promise<{ format: string; shortCircuit?: boolean; source: Source }> {
  const result = await defaultLoad(url, context, defaultLoad);
  if (result.format === "module") {
    if (typeof result.source !== "string") {
      throw new Error("Expected source to have been loaded into a string.");
    }
    const newSrc = await transformModuleIfNeeded(
      result.source,
      url,
      defaultLoad
    );
    return { format: "module", source: newSrc };
  }
  return result;
}
