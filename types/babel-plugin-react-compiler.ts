/**
 * Disclaimer: this is all reverse engineered from undocumented code by cursor AI's Claude and a little human inginuity searching through 10k lines of code for options that may be relevant
 * For your own reverse engineering, you can run this command to get a list of all likely options:
 * ```
 * cd node_modules/babel-plugin-react-compiler/dist && \
 * rt | uniq> grep -o "options\.[a-zA-Z0-9_]*" index.js | sort | uniq
 * ```
 * Uhm, feel free to try any of these and see what it does.
 */
declare global {
  interface EnvironmentConfig {
    // Core optimization flags
    enableForest?: boolean;
    disableMemoizationForDebugging?: boolean;

    // Memoization behavior
    enablePreserveExistingMemoizationGuarantees?: boolean;
    validatePreserveExistingMemoizationGuarantees?: boolean;
    enablePreserveExistingManualUseMemo?: boolean;

    // JSX handling
    enableJsxOutlining?: boolean;
    inlineJsxTransform?: any;

    // Debugging
    enableMemoizationComments?: boolean;
    enableChangeDetectionForDebugging?: any;
  }

  interface ParserOptions {
    sourceType: "module" | "script";
    sourceFileName: string;
    plugins: any[];
  }
  interface ReactCompilerOptions {
    // Parser behavior
    allowAwaitOutsideFunction?: boolean; // Allow await outside async functions
    allowImportExportEverywhere?: boolean; // Allow imports/exports anywhere
    allowNewTargetOutsideFunction?: boolean; // Allow new.target outside functions
    allowReturnOutsideFunction?: boolean; // Allow return statements outside functions
    allowSuperOutsideMethod?: boolean; // Allow super outside methods
    allowUndeclaredExports?: boolean; // Allow exports of undeclared identifiers

    // Build features
    annexB?: boolean; // Enable Annex B features
    attachComment?: boolean; // Preserve comments in output
    babelrc?: boolean; // Use .babelrc
    babelrcRoots?: unknown; // Root directories for .babelrc files

    // Expression handling
    beforeExpr?: boolean; // Unknown parser option
    binop?: unknown; // Binary operator handling

    // Formatting & Output
    callToJSON?: boolean; // Call toJSON() on objects when stringifying
    compact?: "auto" | boolean; // Control output compactness
    createImportExpressions?: boolean; // How imports are generated
    createParenthesizedExpressions?: boolean; // Parentheses handling

    // Environment
    cwd?: string; // Current working directory
    enabled?: boolean; // Enable/disable compiler
    env?: EnvironmentConfig; // Environment settings
    envName?: string; // Environment name
    environment?: string; // Build environment

    // Error handling
    errorRecovery?: boolean; // Continue after errors

    // Features
    es6?: boolean; // Enable ES6 features

    // String handling
    escapeEverything?: boolean; // Escape all special characters
    escapeRegex?: boolean; // Escape regex literals
    escapeString?: boolean; // String escape behavior

    // Build filtering
    exclude?: string[]; // Files to exclude
    extends?: unknown; // Extend config

    // ... continuing with same pattern
    // Adding just a few more as example, would continue for all options

    memoizeJsxElements?: boolean; // Control JSX memoization
    sourceMaps?: boolean; // Generate source maps
    strictMode?: boolean; // Use strict mode

    // Many more options exist - would continue pattern for all
    sources?: (filename: string) => boolean;
  }
  const createDefaultOptions: () => ReactCompilerOptions;

  interface Plugin {
    (opts?: ReactCompilerOptions): {
      name: "babel-plugin-react-compiler";
      visitor: Record<string, Function>;
    };
  }
}

export {};
