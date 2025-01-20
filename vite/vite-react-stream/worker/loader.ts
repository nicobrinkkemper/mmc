
// Virtual module system
const modules = new Map<string, string>();

declare const globalThis: any;


// Make modules available to loader
globalThis.modules = modules;

export function setClientComponents(components: Record<string, string>) {
  for (const [id, code] of Object.entries(components)) {
    // Store with .tsx.js extension to maintain source mapping
    modules.set(id.replace(/\.tsx$/, '.tsx.js'), code);
  }
}
 export function load(url: string, context: any, defaultLoad: any) {
    const id = url.slice('file://'.length);
    console.log('Loading:', { url, id, available: [...globalThis.modules?.keys() ?? []] });
    // Try .tsx.js if .js not found
    const code = globalThis.modules?.get(id) ?? 
                globalThis.modules?.get(id.replace(/\.js$/, '.tsx.js'));
    if (!code) return defaultLoad(url, context, defaultLoad);
    return {
      format: 'module',
      source: code,
      shortCircuit: true
    };
  }
  export function resolve(specifier: string, context: any, defaultResolve: any) {
    console.log('Resolving:', { specifier, available: [...globalThis.modules?.keys() ?? []] });
    // Map .js to .tsx.js
    if (specifier.endsWith('.js')) {
      const tsxSpecifier = specifier.replace(/\.js$/, '.tsx.js');
      if (globalThis.modules?.has(tsxSpecifier)) {
        return {
          url: new URL(tsxSpecifier, 'file:///').href,
          shortCircuit: true
        };
      }
    }
    return defaultResolve(specifier, context, defaultResolve);
  }