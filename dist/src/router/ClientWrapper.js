"use client";
import * as React from "react";
export function ClientWrapper({ Component, data, }) {
    return React.createElement(Component, { ...data });
}
//# sourceMappingURL=ClientWrapper.js.map