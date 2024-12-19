export function addExportNames(names, node) {
    switch (node.type) {
        case "Identifier":
            names.push(node.name);
            return;
        case "ObjectPattern":
            for (let i = 0; i < node.properties.length; i++)
                addExportNames(names, node.properties[i]);
            return;
        case "ArrayPattern":
            for (let i = 0; i < node.elements.length; i++) {
                const element = node.elements[i];
                if (element)
                    addExportNames(names, element);
            }
            return;
        case "Property":
            addExportNames(names, node.value);
            return;
        case "AssignmentPattern":
            addExportNames(names, node.left);
            return;
        case "RestElement":
            addExportNames(names, node.argument);
            return;
        case "ParenthesizedExpression":
            addExportNames(names, node.expression);
            return;
    }
}
//# sourceMappingURL=addExportNames.mjs.map