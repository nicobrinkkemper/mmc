import { getSource } from "./module-loader/getSource.mjs";
import { resolve } from "./module-loader/resolve.mjs";
import { transformSource } from "./module-loader/transformSource.mjs";
/**
 * Production load function that ensures source is a string
 */
export declare function load(url: string, context: LoadContext, defaultLoad: LoadFunction): Promise<{
    format: string;
    shortCircuit?: boolean;
    source: Source;
}>;
export { getSource, resolve, transformSource };
//# sourceMappingURL=moduleHook.prod.d.mts.map