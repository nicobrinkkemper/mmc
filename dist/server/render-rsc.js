import * as React from "react";
import { rsc_port } from "./constants.js";
console.log(`Listening on http://localhost:${rsc_port}`);
export function RenderRsc({ staticData, component: Component, }) {
    return React.createElement(Component, { ...staticData });
}
//# sourceMappingURL=render-rsc.js.map