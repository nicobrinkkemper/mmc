import { parse } from "acorn";
import { transformClientModule } from "./transformClientModule.mjs";
import { transformServerModule } from "./transformServerModule.mjs";
/**
 * This function is used to transform the module if needed.
 */
export async function transformModuleIfNeeded(source, url, loader) {
    // Do a quick check for the exact string. If it doesn't exist, don't
    // bother parsing.
    if (source.indexOf("use client") === -1 &&
        source.indexOf("use server") === -1) {
        return source;
    }
    let sourceMappingURL = null;
    let sourceMappingStart = 0;
    let sourceMappingEnd = 0;
    let sourceMappingLines = 0;
    let program;
    try {
        program = parse(source, {
            ecmaVersion: 2024,
            sourceType: "module",
            locations: true,
            onComment(_block, text, start, end, startLoc, endLoc) {
                if (text.startsWith("# sourceMappingURL=") ||
                    text.startsWith("@ sourceMappingURL=")) {
                    sourceMappingURL = text.slice(19);
                    sourceMappingStart = start;
                    sourceMappingEnd = end;
                    sourceMappingLines =
                        endLoc && startLoc ? endLoc.line - startLoc.line : 0;
                }
            },
        });
    }
    catch (x) {
        if (x instanceof Error) {
            console.error("Error parsing %s %s", url, x.message);
        }
        return source;
    }
    let useClient = false;
    let useServer = false;
    const body = program.body;
    for (let i = 0; i < body.length; i++) {
        const node = body[i];
        if (node.type !== "ExpressionStatement" || !node.directive) {
            break;
        }
        if (node.directive === "use client") {
            useClient = true;
        }
        if (node.directive === "use server") {
            useServer = true;
        }
    }
    if (!useClient && !useServer) {
        return source;
    }
    if (useClient && useServer) {
        throw new Error('Cannot have both "use client" and "use server" directives in the same file.');
    }
    let sourceMap = null;
    if (sourceMappingURL) {
        const sourceMapResult = await loader(sourceMappingURL, {
            format: "json",
            conditions: [],
            importAssertions: { type: "json" },
        }, loader);
        const sourceMapString = typeof sourceMapResult.source === "string"
            ? sourceMapResult.source
            : sourceMapResult.source.toString("utf8");
        sourceMap = JSON.parse(sourceMapString);
        // Strip the source mapping comment. We'll re-add it below if needed.
        source =
            source.slice(0, sourceMappingStart) +
                "\n".repeat(sourceMappingLines) +
                source.slice(sourceMappingEnd);
    }
    if (useClient) {
        return transformClientModule(program, url, sourceMap, loader);
    }
    return transformServerModule(source, program, url, sourceMap, loader);
}
//# sourceMappingURL=transformModuleIfNeeded.mjs.map