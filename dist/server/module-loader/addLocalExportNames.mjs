import { addExportedEntry } from "./addExportedEntry.mjs";
export function addLocalExportedNames(exportedEntries, localNames, node) {
    switch (node.type) {
        case "Identifier":
            addExportedEntry(exportedEntries, localNames, node.name, node.name, null, node.loc);
            return;
        case "ObjectPattern":
            for (let i = 0; i < node.properties.length; i++)
                addLocalExportedNames(exportedEntries, localNames, node.properties[i]);
            return;
        case "ArrayPattern":
            for (let i = 0; i < node.elements.length; i++) {
                const element = node.elements[i];
                if (element)
                    addLocalExportedNames(exportedEntries, localNames, element);
            }
            return;
        case "Property":
            addLocalExportedNames(exportedEntries, localNames, node.value);
            return;
        case "AssignmentPattern":
            addLocalExportedNames(exportedEntries, localNames, node.left);
            return;
        case "RestElement":
            addLocalExportedNames(exportedEntries, localNames, node.argument);
            return;
        case "ParenthesizedExpression":
            addLocalExportedNames(exportedEntries, localNames, node.expression);
            return;
    }
}
//# sourceMappingURL=addLocalExportNames.mjs.map