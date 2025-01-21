"use client";
import React, {
  use,
  useCallback,
  useState,
  useTransition,
  type ReactNode
} from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary.js";
import { useEventListener } from "./hooks/useEventListener.js";
import { createReactFetcher } from "./utils/createReactFetcher.js";
/**
 * Client-side React Server Components implementation
 *
 * This module handles:
 * 1. Initial hydration of server-rendered content
 * 2. Client-side navigation using RSC
 * 3. State management for RSC data
 * 4. Stream updates when files change
 */

/**
 * Main application shell component
 * Handles navigation and RSC data updates
 */
const Shell: React.FC<{
  data: React.Usable<unknown>;
}> = ({ data: initialServerData }) => {
  const [, startTransition] = useTransition();
  const [storeData, setStoreData] = useState<React.Usable<unknown>>(initialServerData);

  const navigate = useCallback((to: string) => {
    window.scrollTo(0, 0);
    startTransition(() => {
      // Create new RSC data stream
      setStoreData(createReactFetcher({
        url: to,
      }));
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


  const content = use(storeData);

  return (
    <ErrorBoundary>
      {content as ReactNode}
    </ErrorBoundary>
  );
};
// Initialize the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const intitalData = createReactFetcher();


if (rootElement.hasChildNodes() && !import.meta.env.DEV) {
  hydrateRoot(
    rootElement,
    <Shell data={intitalData} />
  );
} else if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.on('vite:afterUpdate', () => {
    window.dispatchEvent(new PopStateEvent("popstate", { state: { to: window.location.href } }));
  }); 
  if(!rootElement.hasChildNodes()) {
    createRoot(rootElement).render(
      <Shell data={intitalData}  />
    );
  }
} else {
  createRoot(rootElement).render(
    <Shell data={intitalData}  />
  );
}