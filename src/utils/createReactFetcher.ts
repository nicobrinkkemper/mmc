import type { ReactNode } from "react";
import { createFromFetch } from "react-server-dom-esm/client.browser";
import { BASE_URL_WITH_PUBLIC_URL } from "../config/env.js";
import { callServer } from "./callServer.js";

export function createReactFetcher({
  url = BASE_URL_WITH_PUBLIC_URL,
  moduleBaseURL = "",
  headers = { Accept: "text/x-component" },
}: {
  url?: string;
  moduleBaseURL?: string;
  headers?: HeadersInit;
} = {}): Promise<ReactNode> {
  return createFromFetch(
    fetch(
      url.endsWith(".rsc")
        ? url
        : url.endsWith("/")
        ? url + "index.rsc"
        : url + "/index.rsc",
      {
        headers: headers,
      }
    ),
    {
      callServer: callServer,
      moduleBaseURL: "",
    }
  ) as Promise<ReactNode>;
}
