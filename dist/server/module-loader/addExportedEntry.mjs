/**
 * This function is used to add the exported entry.
 */
export function addExportedEntry(exportedEntries, localNames, localName, exportedName, type, loc) {
    if (localNames.has(localName)) {
        // If the same local name is exported more than once, we only need one of the names.
        return;
    }
    exportedEntries.push({
        localName,
        exportedName,
        type,
        loc,
        originalLine: -1,
        originalColumn: -1,
        originalSource: -1,
        nameIndex: -1,
    });
}
//# sourceMappingURL=addExportedEntry.mjs.map