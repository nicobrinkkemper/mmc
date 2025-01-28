import * as React from "react";

type NestedJsxType = string | React.JSX.Element;

/**
 * It recursively creates React elements from "precompiled" JSX
 **/
export const createElementsRecursive =
  (set: Set<string>) =>
  (
    el: NestedJsxType | NestedJsxType[]
  ): React.ReactNode | React.ReactNode[] => {
    if (typeof el === "string" || el === null) return el;

    if (Array.isArray(el)) return el.map(createElementsRecursive(set));

    let {
      type,
      key,
      props: { children = null, ...restProps },
    } = el;
    if (!key) {
      key = `${Math.random().toString(36).slice(2)}`;
    }
    if (set.has(key)) {
      console.log("duplicate key", key);
      key = `${key}-${Math.random().toString(36).slice(2)}`;
    }
    return React.createElement(
      type,
      key ? { key: `${key}`, ...restProps } : restProps,
      createElementsRecursive(set)(children)
    );
  };

/**
 * It compiles "precompiled" JSX to React elements (description, makerDescription)
 */
export const CompileJSX = ({
  children,
}: {
  children: NestedJsxType | NestedJsxType[];
}) => createElementsRecursive(new Set())(children) as React.JSX.Element;
