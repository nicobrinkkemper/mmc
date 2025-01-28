import type { ReactNode } from "react";
import { createFromFetch } from "react-server-dom-esm/client.browser";
import { absoluteUrl } from "../config/env.js";
import { callServer } from "./callServer.js";

export function createReactFetcher({
  url = window.location.pathname,
  moduleBaseURL = "/src",
  headers = { Accept: "text/x-component" },
}: {
  url?: string;
  moduleBaseURL?: string;
  headers?: HeadersInit;
} = {}): Promise<ReactNode> {
  return createFromFetch(
    fetch(url, {
      headers: headers,
    }),
    {
      callServer: callServer,
      moduleBaseURL: absoluteUrl(moduleBaseURL),
    }
  ) as Promise<ReactNode>;
}
