import { parse, relative } from "node:path";
/** Set of paths that have been processed to avoid duplicates */
export const visited = new Set();
/** Helper to assert type safety for JSDOM Document */
export function assertIsDocument(x) {
    if (!x || typeof x !== "object" || !("documentElement" in x)) {
        throw new Error(`Expected Document but got: ${x}`);
    }
}
export function assertIsHead(x) {
    if (!x || typeof x !== "object" || !("innerHTML" in x)) {
        throw new Error(`Expected Document but got: ${x}`);
    }
}
/** Format progress bar */
export function formatProgress(current, total, errors = 0, status = "") {
    const width = 30;
    const percent = current / total;
    const filled = Math.round(width * percent);
    const empty = width - filled;
    const bar = "█".repeat(filled) + "░".repeat(empty);
    const statusSymbol = status === "active"
        ? "*"
        : status === "done"
            ? "√"
            : status === "error"
                ? "x"
                : " ";
    const errorText = errors > 0 ? ` (${errors} failed)` : "";
    return `${statusSymbol} [${bar}] ${current}/${total}${errorText}`;
}
/** Ensure HTML document has DOCTYPE declaration */
export function ensureDoctype(html) {
    if (!html.trim().startsWith("<!DOCTYPE")) {
        return "<!DOCTYPE html>\n" + html;
    }
    return html;
}
// Create the reference for the "client component" / "server function"
export const createReference = (e, path, directive) => {
    const id = `/${relative(".", path)
        .replace("src", "build")
        .replace(/\..+$/, ".js")}#${e}`; // React uses this to identify the component
    const mod = `${e === "default" ? parse(path).base.replace(/\..+$/, "") : ""}_${e}`; // We create a unique name for the component export
    return directive === "server"
        ? // In case the of a server components, we add properties to a mock up function to avoid shipping the code to the client
            `const ${mod}=()=>{throw new Error("This function is expected to only run on the server")};${mod}.$$typeof=Symbol.for("react.server.reference");${mod}.$$id="${id}";${mod}.$$bound=null;${e === "default"
                ? `export{${mod} as default}`
                : `export {${mod} as ${e}}`};`
        : `${e === "default" ? "export default {" : `export const ${e} = {`}$$typeof:Symbol.for("react.client.reference"),$$id:"${id}",$$async:true};`;
};
// Pad a string to a certain length
export const pad = (str, n = 11) => str.slice(0, n) + (n - str.length > 0 ? " ".repeat(n - str.length) : "");
// Log express traffic to the console
export const logger = (req, _, next) => (console.log(req.method, `(${pad(req.headers["user-agent"] ?? "Unknown")})`, `${req.headers["host"]?.split(":")[1]}`, `"${req.path}"`),
    next());
// Add CORS headers to express response
export const cors = (_, res, next) => (res
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Headers", "*"),
    next());
//# sourceMappingURL=utils.mjs.map