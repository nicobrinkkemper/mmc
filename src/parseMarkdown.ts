import { createElement } from "react";
import { htmdx } from "htmdx";

const parseMarkdown = (str: string) => htmdx(str, createElement);
export { parseMarkdown };
