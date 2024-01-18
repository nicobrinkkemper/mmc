import { Fragment, ReactNode, createElement } from "react";

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
  el: NestedJsxType | NestedJsxType[],
  fallbackKey = "0"
): ReactNode | ReactNode[] => {
  if (typeof el === "string")
    return createElement(Fragment, { key: fallbackKey }, el);

  if (Array.isArray(el))
    return el.map((el, i) =>
      createElementsRecursive(el, fallbackKey + i.toString())
    );

  const {
    type,
    key,
    props: { children, ...restProps },
  } = el;
  return createElement(
    type,
    { key, ...restProps },
    createElementsRecursive(children, `${key ?? fallbackKey}_`)
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
