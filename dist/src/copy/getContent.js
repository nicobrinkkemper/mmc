import { contents } from "./contents.js";
export function getContent(theme, key) {
    const content = contents[`_${theme}`];
    if (key in content)
        return content[key];
    return contents._default[key];
}
//# sourceMappingURL=getContent.js.map