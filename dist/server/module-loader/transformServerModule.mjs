import { addExportedEntry } from "./addExportedEntry.mjs";
import { addLocalExportedNames } from "./addLocalExportNames.mjs";
import { createMappingsSerializer } from "./sourcemap-helpers/createMappingsSerializer.mjs";
import { readMappings } from "./sourcemap-helpers/readMappings.mjs";
/**
 * This function is used to transform the server module.
 */
export function transformServerModule(source, program, url, sourceMap, _loader) {
    const body = program.body;
    // This entry list needs to be in source location order.
    const exportedEntries = [];
    // Dedupe set.
    const localNames = new Set();
    for (let i = 0; i < body.length; i++) {
        const node = body[i];
        switch (node.type) {
            case "ExportAllDeclaration":
                // If export * is used, the other file needs to explicitly opt into "use server" too.
                break;
            case "ExportDefaultDeclaration":
                if (node.declaration.type === "Identifier") {
                    addExportedEntry(exportedEntries, localNames, node.declaration.name, "default", null, node.declaration.loc);
                }
                else if (node.declaration.type === "FunctionDeclaration") {
                    if (node.declaration.id) {
                        addExportedEntry(exportedEntries, localNames, node.declaration.id.name, "default", "function", node.declaration.id.loc);
                    }
                    else {
                        // TODO: This needs to be rewritten inline because it doesn't have a local name.
                    }
                }
                continue;
            case "ExportNamedDeclaration":
                if (node.declaration) {
                    if (node.declaration.type === "VariableDeclaration") {
                        const declarations = node.declaration.declarations;
                        for (let j = 0; j < declarations.length; j++) {
                            addLocalExportedNames(exportedEntries, localNames, declarations[j].id);
                        }
                    }
                    else {
                        const name = node.declaration.id.name;
                        addExportedEntry(exportedEntries, localNames, name, name, node.declaration.type === "FunctionDeclaration"
                            ? "function"
                            : null, node.declaration.id.loc);
                    }
                }
                if (node.specifiers) {
                    const specifiers = node.specifiers;
                    for (let j = 0; j < specifiers.length; j++) {
                        const specifier = specifiers[j];
                        addExportedEntry(exportedEntries, localNames, specifier.local.name, specifier.exported.name, null, specifier.local.loc);
                    }
                }
                continue;
        }
    }
    let mappings = sourceMap && typeof sourceMap.mappings === "string"
        ? sourceMap.mappings
        : "";
    let newSrc = source;
    if (exportedEntries.length > 0) {
        let lastSourceIndex = 0;
        let lastOriginalLine = 0;
        let lastOriginalColumn = 0;
        let lastNameIndex = 0;
        let sourceLineCount = 0;
        let lastMappedLine = 0;
        if (sourceMap) {
            // We iterate source mapping entries and our matched exports in parallel to source map
            // them to their original location.
            let nextEntryIdx = 0;
            let nextEntryLine = exportedEntries[nextEntryIdx].loc.start.line;
            let nextEntryColumn = exportedEntries[nextEntryIdx].loc.start.column;
            readMappings(mappings, (generatedLine, generatedColumn, sourceIndex, originalLine, originalColumn, nameIndex) => {
                if (generatedLine > nextEntryLine ||
                    (generatedLine === nextEntryLine &&
                        generatedColumn > nextEntryColumn)) {
                    // We're past the entry which means that the best match we have is the previous entry.
                    if (lastMappedLine === nextEntryLine) {
                        // Match
                        exportedEntries[nextEntryIdx].originalLine = lastOriginalLine;
                        exportedEntries[nextEntryIdx].originalColumn = lastOriginalColumn;
                        exportedEntries[nextEntryIdx].originalSource = lastSourceIndex;
                        exportedEntries[nextEntryIdx].nameIndex = lastNameIndex;
                    }
                    else {
                        // Skip if we didn't have any mappings on the exported line.
                    }
                    nextEntryIdx++;
                    if (nextEntryIdx < exportedEntries.length) {
                        nextEntryLine = exportedEntries[nextEntryIdx].loc.start.line;
                        nextEntryColumn = exportedEntries[nextEntryIdx].loc.start.column;
                    }
                    else {
                        nextEntryLine = -1;
                        nextEntryColumn = -1;
                    }
                }
                lastMappedLine = generatedLine;
                if (sourceIndex > -1) {
                    lastSourceIndex = sourceIndex;
                }
                if (originalLine > -1) {
                    lastOriginalLine = originalLine;
                }
                if (originalColumn > -1) {
                    lastOriginalColumn = originalColumn;
                }
                if (nameIndex > -1) {
                    lastNameIndex = nameIndex;
                }
            });
            if (nextEntryIdx < exportedEntries.length) {
                if (lastMappedLine === nextEntryLine) {
                    // Match
                    exportedEntries[nextEntryIdx].originalLine = lastOriginalLine;
                    exportedEntries[nextEntryIdx].originalColumn = lastOriginalColumn;
                    exportedEntries[nextEntryIdx].originalSource = lastSourceIndex;
                    exportedEntries[nextEntryIdx].nameIndex = lastNameIndex;
                }
            }
            for (let lastIdx = mappings.length - 1; lastIdx >= 0 && mappings[lastIdx] === ";"; lastIdx--) {
                // If the last mapped lines don't contain any segments, we don't get a callback from readMappings
                // so we need to pad the number of mapped lines, with one for each empty line.
                lastMappedLine++;
            }
            sourceLineCount = program.loc.end.line;
            if (sourceLineCount < lastMappedLine) {
                throw new Error("The source map has more mappings than there are lines.");
            }
            // If the original source string had more lines than there are mappings in the source map.
            // Add some extra padding of unmapped lines so that any lines that we add line up.
            for (let extraLines = sourceLineCount - lastMappedLine; extraLines > 0; extraLines--) {
                mappings += ";";
            }
        }
        else {
            // If a file doesn't have a source map then we generate a blank source map that just
            // contains the original content and segments pointing to the original lines.
            sourceLineCount = 1;
            let idx = -1;
            while ((idx = source.indexOf("\n", idx + 1)) !== -1) {
                sourceLineCount++;
            }
            mappings = "AAAA" + ";AACA".repeat(sourceLineCount - 1);
            sourceMap = {
                version: 3,
                sources: [url],
                sourcesContent: [source],
                mappings: mappings,
                sourceRoot: "",
            };
            lastSourceIndex = 0;
            lastOriginalLine = sourceLineCount;
            lastOriginalColumn = 0;
            lastNameIndex = -1;
            lastMappedLine = sourceLineCount;
            for (let i = 0; i < exportedEntries.length; i++) {
                // Point each entry to original location.
                const entry = exportedEntries[i];
                entry.originalSource = 0;
                entry.originalLine = entry.loc.start.line;
                // We use column zero since we do the short-hand line-only source maps above.
                entry.originalColumn = 0; // entry.loc.start.column;
            }
        }
        newSrc += "\n\n;";
        newSrc +=
            'import {registerServerReference} from "react-server-dom-esm/server";\n';
        if (mappings) {
            mappings += ";;";
        }
        const createMapping = createMappingsSerializer();
        // Create an empty mapping pointing to where we last left off to reset the counters.
        let generatedLine = 1;
        createMapping(generatedLine, 0, lastSourceIndex, lastOriginalLine, lastOriginalColumn, lastNameIndex);
        for (let i = 0; i < exportedEntries.length; i++) {
            const entry = exportedEntries[i];
            generatedLine++;
            if (entry.type !== "function") {
                // We first check if the export is a function and if so annotate it.
                newSrc += "if (typeof " + entry.localName + ' === "function") ';
            }
            newSrc += "registerServerReference(" + entry.localName + ",";
            newSrc += JSON.stringify(url) + ",";
            newSrc += JSON.stringify(entry.exportedName) + ");\n";
            mappings += createMapping(generatedLine, 0, entry.originalSource, entry.originalLine, entry.originalColumn, entry.nameIndex);
        }
    }
    if (sourceMap) {
        // Override with an new mappings and serialize an inline source map.
        sourceMap.mappings = mappings;
        newSrc +=
            "//# sourceMappingURL=data:application/json;charset=utf-8;base64," +
                Buffer.from(JSON.stringify(sourceMap)).toString("base64");
    }
    return newSrc;
}
//# sourceMappingURL=transformServerModule.mjs.map