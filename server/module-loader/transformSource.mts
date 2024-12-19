import { loadClientImport } from "./getSource.mjs";
import { transformModuleIfNeeded } from "./transformModuleIfNeeded.mjs";

/**
 * This function is used to transform the source.
 */
export async function transformSource(
  source: Source,
  context: TransformSourceContext,
  defaultTransformSource: TransformSourceFunction
): Promise<{ source: Source }> {
  const transformed = await defaultTransformSource(
    source,
    context,
    defaultTransformSource
  );
  if (context.format === "module") {
    const transformedSource = transformed.source;
    if (typeof transformedSource !== "string") {
      throw new Error("Expected source to have been transformed to a string.");
    }
    const newSrc = await transformModuleIfNeeded(
      transformedSource,
      context.url,
      (url: string, _ctx: LoadContext, _defaultLoad: LoadFunction) => {
        return loadClientImport(url, defaultTransformSource);
      }
    );
    return { source: newSrc };
  }
  return transformed;
}
