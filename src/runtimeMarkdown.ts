import { htmdx } from "htmdx";
import { createElement } from "react";
const parseMarkdown = (str: string) => htmdx(str, createElement);
export { parseMarkdown };
