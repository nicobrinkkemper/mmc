export interface ViteReactClientTransformOptions {
    projectRoot?: string;
    moduleId?: (path: string, ssr: boolean) => string;
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
}

export interface TransformerOptions {
    moduleId: (path: string, ssr: boolean) => string;
}