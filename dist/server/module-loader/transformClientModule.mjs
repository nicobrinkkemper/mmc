import { parseExportNamesInto } from "./parseExportNamesInto.mjs";
/**
 * This function is used to transform the client module.
 */
export async function transformClientModule(program, url, _sourceMap, loader) {
    const body = program.body;
    const names = [];
    await parseExportNamesInto(body, names, url, loader);
    if (names.length === 0) {
        return "";
    }
    let newSrc = 'import {registerClientReference} from "react-server-dom-esm/server";\n';
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (name === "default") {
            newSrc += "export default ";
            newSrc += "registerClientReference(function() {";
            newSrc +=
                "throw new Error(" +
                    JSON.stringify(`Attempted to call the default export of ${url} from the server ` +
                        `but it's on the client. It's not possible to invoke a client function from ` +
                        `the server, it can only be rendered as a Component or passed to props of a ` +
                        `Client Component.`) +
                    ");";
        }
        else {
            newSrc += "export const " + name + " = ";
            newSrc += "registerClientReference(function() {";
            newSrc +=
                "throw new Error(" +
                    JSON.stringify(`Attempted to call ${name}() from the server but ${name} is on the client. ` +
                        `It's not possible to invoke a client function from the server, it can ` +
                        `only be rendered as a Component or passed to props of a Client Component.`) +
                    ");";
        }
        newSrc += "},";
        newSrc += JSON.stringify(url) + ",";
        newSrc += JSON.stringify(name) + ");\n";
    }
    // TODO: Generate source maps for Client Reference functions so they can point to their
    // original locations.
    return newSrc;
}
//# sourceMappingURL=transformClientModule.mjs.map