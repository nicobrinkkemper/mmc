export async function resolve(
  specifier: string,
  context: any,
  nextResolve: any
) {
  if (specifier.endsWith(".tsx")) {
    return {
      format: "module",
      url: specifier,
    };
  }
  return nextResolve(specifier, context);
}

export async function load(url: string, context: any, defaultLoad: any) {
  if (url.endsWith(".tsx")) {
    // Use the manifest resolver passed in data
    const module = await context.data.resolveModule(url);
    return {
      format: "module",
      source: module,
      shortCircuit: true,
    };
  }
  return defaultLoad(url, context);
}
