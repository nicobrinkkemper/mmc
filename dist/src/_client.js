import * as React from "react";
import { use } from "react";
import { hydrateRoot } from "react-dom/client";
import { createFromFetch, encodeReply } from "react-server-dom-esm/client";
// URL Helper
const getServerUrl = () => {
    const url = new URL(location.href);
    url.port = "3002";
    return url;
};
// Server Communication
const callServer = async (id, args) => {
    const response = await createFromFetch(fetch(getServerUrl(), {
        method: "POST",
        body: await encodeReply(args),
        headers: {
            Accept: "text/x-component",
            "rsa-origin": location.pathname,
            "rsa-reference": id,
        },
    }), { callServer, moduleBaseURL: "/dist/" });
    return response.returnValue;
};
// Initial Data Load
const data = createFromFetch(fetch(getServerUrl(), {
    headers: {
        Accept: "text/x-component",
    },
    signal: AbortSignal.timeout(5000), // 5 second timeout
}), {
    callServer,
    moduleBaseURL: "/dist/",
});
// Components
const Shell = ({ data }) => use(data);
// Root Hydration
const rootElement = document.getElementById("root");
if (!rootElement)
    throw new Error("Root element not found");
console.log({ data });
hydrateRoot(rootElement, React.createElement(Shell, { data: data }));
//# sourceMappingURL=_client.js.map