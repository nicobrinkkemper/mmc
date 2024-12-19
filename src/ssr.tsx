import * as React from "react";
import { use, type FC, type ReactNode, type Usable } from "react";
import { hydrateRoot } from "react-dom/client";
import { createFromFetch, encodeReply } from "react-server-dom-esm/client";
// do not import constants from server here, since those files will not be hosted, best to not import here yet since its the entry point
// Types
type ServerResponse = {
  returnValue: unknown;
};

// URL Helper
const getServerUrl = (): URL => {
  const url = new URL(location.href);
  url.port = "3002";
  return url;
};

// Server Communication
const callServer = async (id: string, args: unknown[]): Promise<unknown> => {
  const response = await createFromFetch(
    fetch(getServerUrl(), {
      method: "POST",
      body: await encodeReply(args as any),
      headers: {
        Accept: "text/x-component",
        "rsa-origin": location.pathname as string,
        "rsa-reference": id,
      },
    }),
    { callServer, moduleBaseURL: "/dist/" }
  );
  return (response as ServerResponse).returnValue;
};

// Initial Data Load
const data = createFromFetch(
  fetch(getServerUrl(), {
    headers: {
      Accept: "text/x-component",
    },
    signal: AbortSignal.timeout(5000), // 5 second timeout
  }),
  {
    callServer,
    moduleBaseURL: "/dist/",
  }
);

// Wrap Shell with context provider
const Shell: FC<{
  data: Usable<Awaited<ReactNode>>;
}> = ({ data }) => use(data);

// Root Hydration
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

/**
 * This is supposed to be a bare-bones client for the ssr end point
 * which you can reach localhost:3001 if it's running.
 *
 * It uses the new `use` feature to get the server component output
 * and then hydrates the root element with it.
 */
hydrateRoot(
  rootElement,
  React.createElement(Shell, {
    data: data as Usable<Awaited<ReactNode>>,
  })
);
