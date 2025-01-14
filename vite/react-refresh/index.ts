import type { JscTarget, ParserConfig } from "@swc/core";
import { SourceMapGenerator } from "source-map";
import type { Plugin } from "vite";
import { RefreshRuntime } from "./runtime";

export interface RefreshOptions {
  plugins?: [string, Record<string, any>][];
  devTarget?: JscTarget;
  parserConfig?: (id: string) => ParserConfig | undefined;
  moduleBase?: string;
  isDev?: boolean;
}

const runtimePublicPath = "/@react-refresh";
const runtimeModulePath = "\0virtual:react-refresh-runtime";
const reactCompRE = /extends\s+(?:React\.)?(?:Pure)?Component/;
const refreshContentRE = /\$Refresh(?:Reg|Sig)\$\(/;

const RUNTIME_CODE = (options: RefreshOptions) => `
const createRefreshRuntime = () => ({
  isReactRefreshBoundary: true,
  supportsFlight: true,
  isDisabled: false,
  inject: null,
  registeredComponents: new Set(),
  checkDCE: false,
  performReactRefresh() {
    if (this.isDisabled || !this.inject) return;
    for (const type of this.registeredComponents) {
      this.inject.refreshComponent(type);
    }
  }
});
export class RefreshRuntime {
  injectIntoGlobalHook(global) {
    if (!global.__ReactRefreshRuntime) {
      global.__ReactRefreshRuntime = createRefreshRuntime();
    }
  }
  getRefreshReg(filename) {
    return (type, id) => {
      const runtime = window.__ReactRefreshRuntime;
      if (runtime && type && (typeof type === 'function' || typeof type === 'object')) {
        runtime.registeredComponents.add(type);
      }
    };
  }
  createSignatureFunctionForTransform() {
    let savedType;
    let hasHooksToRun = false;
    return (type, key, forceReset, getCustomHooks) => {
      if (forceReset) {
        savedType = undefined;
        hasHooksToRun = false;
      }
      if (typeof key === 'string') {
        if (!savedType) savedType = type;
        return type;
      }
      if (!hasHooksToRun && getCustomHooks) {
        try { getCustomHooks(); } finally { hasHooksToRun = true; }
      }
      return savedType;
    };
  }
  async __hmr_import(url) {
    const moduleId = url.split('?')[0];
    ${
      options.isDev
        ? // In dev, use direct import with vite-ignore
          `return import(/* @vite-ignore */url).then(m => {
          window[moduleId] = m;
          return m;
        });`
        : // In prod, use resolved path
          `const resolvedPath = moduleId.endsWith('.js') ? moduleId : moduleId + '.js';
         return import(resolvedPath).then(m => {
           window[moduleId] = m;
           return m;
         });`
    }
  }
  registerExportsForReactRefresh(moduleId, exports) {
    window[moduleId] = exports;
    return exports;
  }
  validateRefreshBoundaryAndEnqueueUpdate(moduleId, prevExports, nextExports) {
    const runtime = window.__ReactRefreshRuntime;
    if (runtime && prevExports !== nextExports) {
      runtime.performReactRefresh();
    }
  }
}
`;

export function createRefreshRuntime(options: RefreshOptions = {}): Plugin {
  const isDev = process.env.NODE_ENV !== "production";
  const runtimeOptions = {
    ...options,
    isDev,
  };

  return {
    name: "vite:react-refresh",
    apply: "serve",

    resolveId(id: string) {
      if (id === runtimePublicPath || id === runtimeModulePath) {
        return id;
      }
    },

    load(id: string) {
      if (id === runtimePublicPath) {
        return `import { RefreshRuntime } from "${runtimeModulePath}";
const runtime = new RefreshRuntime();
runtime.injectIntoGlobalHook(window);
export const injectIntoGlobalHook = runtime.injectIntoGlobalHook.bind(runtime);
export const getRefreshReg = runtime.getRefreshReg.bind(runtime);
export const createSignatureFunctionForTransform = runtime.createSignatureFunctionForTransform.bind(runtime);
export const __hmr_import = runtime.__hmr_import.bind(runtime);
export const registerExportsForReactRefresh = runtime.registerExportsForReactRefresh.bind(runtime);
export const validateRefreshBoundaryAndEnqueueUpdate = runtime.validateRefreshBoundaryAndEnqueueUpdate.bind(runtime);`;
      }
      if (id === runtimeModulePath) {
        return RUNTIME_CODE(runtimeOptions);
      }
    },

    transform(code: string, id: string) {
      // Skip if not JS/TS file
      if (!id.match(/\.m?[jt]sx?$/)) return;

      const refresh = !options.devTarget;
      if (!refresh) return { code };

      // Check if file needs refresh
      const hasRefresh = refreshContentRE.test(code);
      if (!hasRefresh && !reactCompRE.test(code)) {
        return { code };
      }

      // Create source map
      const map = new SourceMapGenerator({
        file: id,
        sourceRoot: "",
      });

      // Track line offsets
      let offset = 0;

      // Add runtime import
      const runtimeImport = `import * as RefreshRuntime from "${runtimePublicPath}";\n`;
      offset += 1; // Add one line for runtime import

      let finalCode = runtimeImport + code;

      if (hasRefresh) {
        const refreshWrapper = `if (!window.$RefreshReg$) throw new Error("React refresh preamble was not loaded");
const prevRefreshReg = window.$RefreshReg$;
const prevRefreshSig = window.$RefreshSig$;
window.$RefreshReg$ = RefreshRuntime.getRefreshReg("${id}");
window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;`;
        offset += refreshWrapper.split("\n").length;
        finalCode = refreshWrapper + finalCode;
      }

      // Map original lines to new positions
      code.split("\n").forEach((line, i) => {
        map.addMapping({
          generated: {
            line: i + 1 + offset,
            column: 0,
          },
          source: id,
          original: {
            line: i + 1,
            column: 0,
          },
        });
      });

      // Add HMR code at the end (no need to map as it's runtime code)
      finalCode += `try {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("${id}", currentExports);
    import.meta.hot?.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate(
        "${id}",
        currentExports,
        nextExports
      );
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
} catch (e) {
  console.error("Error setting up React Refresh", e);
}`;

      return {
        code: finalCode,
        map: map.toString(),
      };
    },
  };
}

export { RefreshRuntime };
