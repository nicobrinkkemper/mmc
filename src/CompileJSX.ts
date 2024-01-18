import { ReactNode, createElement } from "react";

type NestedJsxType =
  | string
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
  if (typeof el === "string") return el;

  if (Array.isArray(el)) return el.map((el) => createElementsRecursive(el));

  const {
    type,
    key,
    props: { children, ...restProps },
  } = el;
  return createElement(
    type,
    key ? { key, ...restProps } : restProps,
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
