import type { ModuleInfo, PluginContext } from "rollup";

async function startBuildForEntry(
  id: string,
  context: PluginContext
): Promise<ModuleInfo> {
  // First get module info
  const module = await context.load({
    id,
    resolveDependencies: true,
    moduleSideEffects: "no-treeshake",
  });

  // Parse code to get exports
  const ast = context.parse(module.code || "");

  return {
    ...module,
    code: module.code || "",
    exports: ast.body
      .filter((node) => node.type === "ExportNamedDeclaration")
      .map((node) => (node as any).declaration?.declarations?.[0]?.id?.name)
      .filter(Boolean),
  };
}

export function createBuildLoader(pluginContext: PluginContext) {
  return async function buildLoader(id: string) {
    const resolved = await pluginContext.resolve(id, undefined, {
      skipSelf: true,
    });

    if (resolved) {
      return startBuildForEntry(resolved.id, pluginContext);
    }

    // Try common extensions
    for (const ext of [".ts", ".tsx", ".js", ".jsx"]) {
      const withExt = id.endsWith(ext) ? id : `${id}${ext}`;
      const resolvedWithExt = await pluginContext.resolve(withExt, undefined, {
        skipSelf: true,
      });
      if (resolvedWithExt) {
        const module = await startBuildForEntry(
          resolvedWithExt.id,
          pluginContext
        );
        return module;
      }
    }
    throw new Error(`Could not resolve module: ${id}`);
  };
}
