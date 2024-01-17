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
 * The MarkdownProps["children"] is inferred from the JSX Markdown output
 **/
type createElementsRecursiveFn = (
  el: NestedJsxType | NestedJsxType[]
) => ReactNode[] | ReactNode;

/**
 * We used to have a markdown compiler which also worked fine, but since the Markdown is so important level page I
 *
 * So either rethink the whole thing or use this function to convert the JSX to React elements.
 *
 **/
export const createElementsRecursive: createElementsRecursiveFn = (el) => {
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
