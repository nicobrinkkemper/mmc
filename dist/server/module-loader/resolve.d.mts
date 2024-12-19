/**
 * This function is used to resolve the specifier to the URL.
 */
export declare function resolve(specifier: string, context: ResolveContext, defaultResolve: ResolveFunction): Promise<{
    url: string;
}>;
/**
 * This function is used to resolve the client import specifier to the URL.
 */
export declare function resolveClientImport(specifier: string, parentURL: string): {
    url: string;
} | Promise<{
    url: string;
}>;
//# sourceMappingURL=resolve.d.mts.map