let stashedGetSource: null | GetSourceFunction = null;

export async function getSource(
  url: string,
  context: GetSourceContext,
  defaultGetSource: GetSourceFunction
): Promise<{ source: Source }> {
  // We stash this in case we end up needing to resolve export * statements later.
  stashedGetSource = defaultGetSource;
  return defaultGetSource(url, context, defaultGetSource);
}

export async function loadClientImport(
  url: string,
  defaultTransformSource: TransformSourceFunction
): Promise<{ format: string; shortCircuit?: boolean; source: Source }> {
  if (stashedGetSource === null) {
    throw new Error(
      "Expected getSource to have been called before transformSource"
    );
  }
  // TODO: Validate that this is another module by calling getFormat.
  const { source } = await stashedGetSource(
    url,
    { format: "module" },
    stashedGetSource
  );
  const result = await defaultTransformSource(
    source,
    { format: "module", url },
    defaultTransformSource
  );
  return { format: "module", source: result.source };
}
