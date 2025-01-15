"use client";
import React, {
  Suspense,
  useCallback,
  useTransition
} from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createFromFetch, encodeReply } from "react-server-dom-esm/client";
import { App } from "./App.js";
import { getThemePathInfo } from "./data/getThemePathInfo.js";
import { ErrorBoundary } from "./ErrorBoundary.js";
import { useEventListener } from "./hooks/useEventListener.js";
import footerStyles from "./layout/Footer.module.css";

/**
 * Client-side React Server Components implementation
 *
 * This module handles:
 * 1. Initial hydration of server-rendered content
 * 2. Client-side navigation using RSC
 * 3. State management for RSC data
 */

// Types
type ServerResponse = { returnValue: unknown };

/**
 * Configuration for RSC module loading
 */
const moduleBaseURL = window.location.origin + "/src";

/**
 * Server function caller
 * Handles communication with the RSC server for server functions
 */
const callServer = async (id: string, args: unknown[]): Promise<unknown> => {
  const response = await createFromFetch(
    fetch(window.location.origin, {
      method: "POST",
      body: await encodeReply(args),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
    { callServer, moduleBaseURL }
  );
  const returnValue = (response as ServerResponse).returnValue;
  return returnValue;
};


/**
 * Create initial RSC data stream
 */
const initialData = createFromFetch(
  fetch(window.location.pathname, {
    headers: {
      Accept: "text/x-component",
    },
  }),
  {
    callServer,
    moduleBaseURL,
  }
);

/**
 * Main application shell component
 * Handles navigation and RSC data updates
 */
const Shell: React.FC<{
  data: React.Usable<unknown>;
  pathInfo: ThemePathInfo;
}> = ({ data: initialServerData, pathInfo: initialPathInfo }) => {
  const [, startTransition] = useTransition();
  const [storeData, setStoreData] =
    React.useState<React.Usable<unknown>>(initialServerData);
  const [pathInfo, setPathInfo] = React.useState(initialPathInfo);

  const navigate = useCallback((to: string) => {
    startTransition(() => {
      setPathInfo(getThemePathInfo(to));
      const serverUrl = window.location.origin + to;
      // Create new RSC data stream
      const newData = createFromFetch(
        fetch(serverUrl, {
          headers: {
            Accept: "text/x-component",
          },
        }),
        {
          callServer,
          moduleBaseURL
        }
      );
      setStoreData(newData as typeof initialServerData);
    });
  }, []);

  // Handle browser navigation
  useEventListener("popstate", (e) => {
    if (e instanceof PopStateEvent) {
      if (e.state?.to) {
        return navigate(e.state.to);
      }
    } else {
      return navigate(window.location.pathname);
    }
  });


  const content = React.use(storeData);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <>
            <App pathInfo={pathInfo} />
            <footer className={footerStyles["Footer"]} />
          </>
        }
      >
        {content as React.ReactNode}
      </Suspense>
    </ErrorBoundary>
  );
};

// Initialize the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const intitialPathInfo = getThemePathInfo(window.location.href);
if (rootElement.hasChildNodes() && !import.meta?.env?.DEV) {
  hydrateRoot(
    rootElement,
    <Shell data={initialData} pathInfo={intitialPathInfo} />
  );
} else {
  createRoot(rootElement).render(
    <Shell data={initialData} pathInfo={intitialPathInfo} />
  );
}
if (import.meta.hot) {
  import.meta.hot.accept();
}