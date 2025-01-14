"use client";
import React, {
  Suspense,
  useDeferredValue,
  useEffect,
  useTransition,
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
 * Create a map for the references
 */
const referenceMap = new Map<string, unknown>([
  ["/components/ClientClickable.ts", "/src/components/ClientClickable.tsx"],
]);

/**
 * Create initial RSC data stream
 */
const initialData = createFromFetch(
  fetch(window.location.pathname, {
    headers: {
      Accept: "text/x-component",
      "X-Reference-Map": JSON.stringify(Array.from(referenceMap.entries())),
    },
  }),
  {
    callServer,
    moduleBaseURL,
    temporaryReferences: referenceMap,
  }
);

/**
 * Store for managing RSC data across navigation
 */
const createRscStore = () => {
  let listeners = new Set<(data: typeof initialData) => void>();
  let currentData = initialData;

  return {
    subscribe: (listener: (data: typeof initialData) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getData: () => currentData as React.Usable<React.ReactNode>,
    setData: (newData: typeof initialData) => {
      currentData = newData;
      listeners.forEach((listener) => listener(newData));
    },
  };
};

const rscStore = createRscStore();
/**
 * Main application shell component
 * Handles navigation and RSC data updates
 */
const Shell: React.FC<{
  data: React.Usable<React.ReactNode>;
  pathInfo: ThemePathInfo;
}> = ({ data: initialServerData, pathInfo: initialPathInfo }) => {
  const [, startTransition] = useTransition();
  const [storeData, setStoreData] =
    React.useState<typeof initialServerData>(initialServerData);
  const deferredData = useDeferredValue(storeData);
  const [pathInfo, setPathInfo] = React.useState(initialPathInfo);
  const [isPending, setIsPending] = React.useState(false);

  // Handle browser navigation
  useEventListener("popstate", (e) => {
    setPathInfo((prevState) => {
      const hasState =
        e instanceof PopStateEvent &&
        e.state &&
        !!Object.keys(e.state ?? {}).length;
      if (hasState) {
        if (e.state?.to) {
          return e.state;
        }
      } else {
        return getThemePathInfo(window.location.pathname);
      }
    });
  });
  // Handle client-side navigation
  useEffect(() => {
    if (!pathInfo) return;

    setIsPending(true);
    startTransition(() => {
      const serverUrl = window.location.origin + pathInfo.to;
      // Create new RSC data stream
      const newData = createFromFetch(
        fetch(serverUrl, {
          headers: {
            Accept: "text/x-component",
            "X-Reference-Map": JSON.stringify(
              Array.from(referenceMap.entries())
            ),
          },
        }),
        {
          callServer,
          moduleBaseURL,
          temporaryReferences: referenceMap,
          findSourceMapURL: () => null,
          replayConsoleLogs: false,
        }
      );

      setStoreData(newData as typeof initialServerData);
      setIsPending(false);
    });
  }, [pathInfo.to]);

  const rsc = React.use(deferredData);

  // Handle different types of RSC data
  const content = React.useMemo(() => {
    if (Array.isArray(rsc)) {
      return <>{rsc}</>;
    }
    if (typeof rsc === "function") {
      return React.createElement(rsc);
    }
    return rsc;
  }, [rsc]);

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
        {content}
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
    <Shell data={rscStore.getData()} pathInfo={intitialPathInfo} />
  );
} else {
  createRoot(rootElement).render(
    <Shell data={rscStore.getData()} pathInfo={intitialPathInfo} />
  );
}
