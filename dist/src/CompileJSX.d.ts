import * as React from "react";
type NestedJsxType = string | null | {
    type: string;
    key?: string | number;
    props: {
        children: NestedJsxType | NestedJsxType[];
    };
};
/**
 * It recursively creates React elements from "precompiled" JSX
 **/
export declare const createElementsRecursive: (el: NestedJsxType | NestedJsxType[]) => React.ReactNode | React.ReactNode[];
/**
 * It compiles "precompiled" JSX to React elements (description, makerDescription)
 */
export declare const CompileJSX: ({ children, }: {
    children: NestedJsxType | NestedJsxType[];
}) => React.JSX.Element;
export {};
//# sourceMappingURL=CompileJSX.d.ts.map