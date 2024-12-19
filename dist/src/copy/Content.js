import * as React from "react";
import { contentsKeys } from "./contents.js";
import { getContent } from "./getContent.js";
function ContentAt({ at, theme, ...props }) {
    if (!theme) {
        throw new Error("Theme is required for a Content component");
    }
    const Component = getContent(theme, at);
    return React.createElement(Component, { ...(props ?? {}) });
}
export const Content = Object.fromEntries(contentsKeys.map((at) => [
    at,
    (props) => React.createElement(ContentAt, { at: at, ...(props ?? {}) }),
]));
//# sourceMappingURL=Content.js.map