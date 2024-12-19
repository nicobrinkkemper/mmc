/**
 * This function is used to add the exported entry.
 */
export function addExportedEntry(
  exportedEntries: Array<ExportedEntry>,
  localNames: Set<string>,
  localName: string,
  exportedName: string,
  type: null | "function",
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  }
) {
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
