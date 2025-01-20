import type { LogLevel, Logger, Manifest, ModuleGraph } from "vite";

const fileExtensionRE = /\.m?[jt]sx?$/;

interface CollectorOptions {
  collectCss?: boolean;
  collectAssets?: boolean;
  logger?: Logger;
  logLevel?: LogLevel;
  projectRoot?: string;
  environment?: 'development' | 'production';
}

export function collectManifest(moduleGraph: ModuleGraph, pagePath: string, options: CollectorOptions = {}): Manifest {
  const manifest: Manifest = {};
  const { 
    collectCss = true,
    logger,
    logLevel = 'info',
    projectRoot,
    environment = 'production'
  } = options;
  
  if (!collectCss) return manifest;

  const log = (msg: string, level: 'silent' | 'error' | 'warn' | 'info' = 'info') => {
    if (environment !== 'development') return;
    if (!logger || level === 'silent') return;
    if (logLevels[level] >= logLevels[logLevel]) {
      logger[level](`[CSS] ${msg}`);
    }
  };

  // Find the page module
  const pageModule = Array.from(moduleGraph.idToModuleMap.values())
    .find(mod => {
      const paths = [
        pagePath,
        pagePath.replace(/^\//, ''),  // No leading slash
        pagePath.replace(fileExtensionRE, ''), // No extension
        mod.url && new URL(mod.url, 'file://').pathname // Resolved URL
      ];
      return paths.some(p => p && (mod.file === p || mod.id === p || mod.url === p));
    });

  log(`Looking for page module: ${pagePath}`, 'info');
  if (pageModule) {
    log(`Found module: ${pageModule.id}`, 'info');
  } else {
    log(`Page module not found: ${pagePath}`, 'warn');
    return manifest;
  }

  // Walk the module graph to find all CSS dependencies
  const seen = new Set<string>();
  const cssFiles = new Set<string>();

  function walkImports(mod: any) {
    if (!mod?.id || seen.has(mod.id)) return;
    seen.add(mod.id);

    // Check for CSS in this module
    if (mod.file?.endsWith('.css')) {
      const url = mod.url;
      if (url) {
        cssFiles.add(url);
        log(`Found CSS file: ${url}`, 'info');
      }
    }

    // Walk importers (modules that import this one)
    mod.importers?.forEach((importer: any) => walkImports(importer));
    
    // Walk imported modules
    mod.importedModules?.forEach((imported: any) => walkImports(imported));
  }

  walkImports(pageModule);

  log(`Found ${cssFiles.size} CSS files`, 'info');

  // Create manifest entry
  if (cssFiles.size > 0) {
    manifest['css'] = {
      file: 'css',
      css: Array.from(cssFiles)
    };
  }

  return manifest;
}

const logLevels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3
}; 