declare global {
  interface Window {
    __ReactRefreshRuntime?: {
      isReactRefreshBoundary: boolean;
      supportsFlight: boolean;
      isDisabled: boolean;
      inject: any;
      registeredComponents: Set<any>;
      checkDCE: boolean;
      performReactRefresh(): void;
      register(type: any, id: string): void;
      registerExportsForReactRefresh(moduleId: string, exports: any): void;
      validateRefreshBoundaryAndEnqueueUpdate(
        moduleId: string,
        prevExports: any,
        nextExports: any
      ): string | void;
      __hmr_import(url: string): Promise<any>;
    };
    $RefreshReg$?: (type: any, id: string) => void;
    $RefreshSig$?: () => (type: any) => any;
  }
}

export interface RefreshRuntimeGlobal {
  injectIntoGlobalHook(global: Window): void;
  getRefreshReg(filename: string): (type: any, id: string) => void;
  createSignatureFunctionForTransform(): (
    type?: any,
    key?: string,
    forceReset?: boolean,
    getCustomHooks?: () => any[]
  ) => any;
}

export class RefreshRuntime implements RefreshRuntimeGlobal {
  injectIntoGlobalHook(global: Window): void {
    if (!global.__ReactRefreshRuntime) {
      const runtime = {
        isReactRefreshBoundary: true,
        supportsFlight: true,
        isDisabled: false,
        inject: null as any,
        registeredComponents: new Set<any>(),
        checkDCE: false,

        register(type: any, id: string) {
          if (typeof type === "function" && typeof id === "string") {
            this.registeredComponents.add(type);
          }
        },

        performReactRefresh() {
          if (this.isDisabled || !this.inject) return;
          for (const type of this.registeredComponents) {
            this.inject.refreshComponent(type);
          }
        },

        registerExportsForReactRefresh(moduleId: string, exports: any) {
          if (this.isDisabled) return;
          // Store exports for HMR
          const prevExports = (window as any)[moduleId];
          (window as any)[moduleId] = exports;
          return prevExports;
        },

        validateRefreshBoundaryAndEnqueueUpdate(
          moduleId: string,
          prevExports: any,
          nextExports: any
        ) {
          if (this.isDisabled) return;
          // Validate exports and trigger refresh if valid
          if (prevExports !== nextExports) {
            this.performReactRefresh();
          }
        },

        async __hmr_import(url: string) {
          const moduleId = url.split("?")[0];
          return (window as any)[moduleId];
        },
      };

      global.__ReactRefreshRuntime = runtime;
      global.$RefreshReg$ = (type, id) => runtime.register(type, id);
      global.$RefreshSig$ = () => (type) => type;
    }
  }

  getRefreshReg(filename: string) {
    return (type: any, id: string) => {
      // Register component for refresh
      if (type && (typeof type === "function" || typeof type === "object")) {
        this.registerComponent(type, `${filename} ${id}`);
      }
    };
  }

  createSignatureFunctionForTransform() {
    let savedType: any;
    let didCollectHooks = false;

    return (
      type?: any,
      key?: string,
      forceReset?: boolean,
      getCustomHooks?: () => any[]
    ) => {
      if (forceReset) {
        savedType = undefined;
        didCollectHooks = false;
      }

      if (typeof key === "string") {
        if (!savedType) {
          savedType = type;
        }
        return type;
      }

      if (!didCollectHooks && getCustomHooks) {
        try {
          getCustomHooks();
        } finally {
          didCollectHooks = true;
        }
      }
    };
  }

  private registerComponent(type: any, id: string) {
    const runtime = window.__ReactRefreshRuntime;
    if (runtime) {
      runtime.registeredComponents.add(type);
    }
  }
}

export default RefreshRuntime;
