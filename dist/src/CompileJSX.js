import * as React from "react";
/**
 * It recursively creates React elements from "precompiled" JSX
 **/
export const createElementsRecursive = (el) => {
    if (typeof el === "string" || el === null)
        return el;
    if (Array.isArray(el))
        return el.map(createElementsRecursive);
    const { type, key, props: { children = null, ...restProps }, } = el;
    return React.createElement(type, key ? { key: `${key}`, ...restProps } : restProps, createElementsRecursive(children));
};
/**
 * It compiles "precompiled" JSX to React elements (description, makerDescription)
 */
export const CompileJSX = ({ children, }) => createElementsRecursive(children);
//# sourceMappingURL=CompileJSX.js.map