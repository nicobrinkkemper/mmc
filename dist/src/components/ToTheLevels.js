import * as React from "react";
import { Button } from "./Button.js";
export const ToTheLevelsStatic = ({ pathInfo, ...props }) => {
    return (React.createElement(Button, { primary: true, icon: "arrow-right", href: pathInfo.toLevels, ...props }, "To the levels"));
};
//# sourceMappingURL=ToTheLevels.js.map