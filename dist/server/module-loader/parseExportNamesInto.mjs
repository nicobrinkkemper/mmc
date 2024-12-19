import { parse } from "acorn";
import { addExportNames } from "./addExportNames.mjs";
import { resolveClientImport } from "./resolve.mjs";
/**
 * This function is used to parse the export names into the body of the module.
 */
export async function parseExportNamesInto(body, names, parentURL, loader) {
    for (let i = 0; i < body.length; i++) {
        const node = body[i];
        switch (node.type) {
            case "ExportAllDeclaration":
                if (node.exported) {
                    addExportNames(names, node.exported);
                    continue;
                }
                else {
                    const { url } = await resolveClientImport(node.source.value, parentURL);
                    const { source } = await loader(url, { format: "module", conditions: [], importAssertions: {} }, loader);
                    if (typeof source !== "string") {
                        throw new Error("Expected the transformed source to be a string.");
                    }
                    let childBody;
                    try {
                        childBody = parse(source, {
                            ecmaVersion: 2024,
                            sourceType: "module",
                        }).body;
                    }
                    catch (x) {
                        if (x instanceof Error) {
                            console.error("Error parsing %s %s", url, x.message);
                        }
                        continue;
                    }
                    await parseExportNamesInto(childBody, names, url, loader);
                    continue;
                }
            case "ExportDefaultDeclaration":
                names.push("default");
                continue;
            case "ExportNamedDeclaration":
                if (node.declaration) {
                    if (node.declaration.type === "VariableDeclaration") {
                        const declarations = node.declaration.declarations;
                        for (let j = 0; j < declarations.length; j++) {
                            addExportNames(names, declarations[j].id);
                        }
                    }
                    else {
                        addExportNames(names, node.declaration.id);
                    }
                }
                if (node.specifiers) {
                    const specifiers = node.specifiers;
                    for (let j = 0; j < specifiers.length; j++) {
                        addExportNames(names, specifiers[j].exported);
                    }
                }
                continue;
        }
    }
}
//# sourceMappingURL=parseExportNamesInto.mjs.map