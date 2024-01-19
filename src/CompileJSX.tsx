import { ReactNode, createElement } from "react";

type NestedJsxType =
  | string
  | null
  | {
      type: string;
      key?: string | number;
      props: {
        children: NestedJsxType | NestedJsxType[];
      };
    };

/**
 * It recursively creates React elements from "precompiled" JSX
 **/
export const createElementsRecursive = (
  el: NestedJsxType | NestedJsxType[]
): ReactNode | ReactNode[] => {
  if (typeof el === "string" || el === null) return el;

  if (Array.isArray(el)) return el.map(createElementsRecursive);

  const {
    type,
    key,
    props: { children = null, ...restProps },
  } = el;
  return createElement(
    type,
    key ? { key: `${key}`, ...restProps } : restProps,
    createElementsRecursive(children)
  );
};

/**
 * It compiles "precompiled" JSX to React elements (description, makerDescription)
 */
export const CompileJSX = ({
  children,
}: {
  children: NestedJsxType | NestedJsxType[];
}) => createElementsRecursive(children);
