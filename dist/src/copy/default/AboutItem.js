import { snakeCase } from "lodash-es";
import * as React from "react";
export const AboutItem = ({ accordionItem: AccordionItem, children, }) => {
    const header = Array.isArray(children) ? children[0] : null;
    if (!header)
        return header;
    const uuid = snakeCase(header.props.children);
    return React.createElement(AccordionItem, { uuid: uuid }, children);
};
//# sourceMappingURL=AboutItem.js.map