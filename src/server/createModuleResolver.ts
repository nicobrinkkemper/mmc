import type { Manifest } from "vite";

interface SSRContext {
  manifest?: Manifest;
  isDev: boolean;
  moduleBase: string;
}

export function createModuleResolver(ctx: SSRContext) {
  return (path: string) => {
    // Remove query params and hash
    const cleanPath = path.split("?")[0].split("#")[0];

    if (ctx.isDev) {
      // In dev, just ensure we have the right base path
      return cleanPath.startsWith(`/${ctx.moduleBase}`)
        ? cleanPath
        : `/${ctx.moduleBase}${cleanPath}`;
    }

    // In prod, use the manifest to resolve the file
    if (ctx.manifest) {
      // Remove leading slash and moduleBase for manifest lookup
      const key = cleanPath
        .replace(new RegExp(`^/${ctx.moduleBase}`), "")
        .replace(/^\//, "");

      const entry = ctx.manifest[key];
      if (!entry) {
        throw new Error(`Could not find module ${path} in manifest`);
      }
      return entry.file;
    }

    throw new Error("No manifest available in production");
  };
}
