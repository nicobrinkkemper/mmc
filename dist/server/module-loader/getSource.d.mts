export declare function getSource(url: string, context: GetSourceContext, defaultGetSource: GetSourceFunction): Promise<{
    source: Source;
}>;
export declare function loadClientImport(url: string, defaultTransformSource: TransformSourceFunction): Promise<{
    format: string;
    shortCircuit?: boolean;
    source: Source;
}>;
//# sourceMappingURL=getSource.d.mts.map