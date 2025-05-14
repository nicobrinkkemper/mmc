"use client";
import React, {
  use,
  useCallback,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { createReactFetcher } from "vite-plugin-react-server/utils";
import { baseURL } from "./config/env.client.js";
import { ErrorMessage } from "./ErrorMessage.js";
import "./globalStyles.css";
import { useEventListener } from "./hooks/useEventListener.js";

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
  const [storeData, setStoreData] =
    useState<React.Usable<unknown>>(initialServerData);

  const navigate = useCallback((to: string) => {
    if ("scrollTo" in window) window.scrollTo(0, 0);
    startTransition(() => {
      // Create new RSC data stream
      setStoreData(createReactFetcher());
    });
  }, []);

  // Handle browser navigation
  useEventListener(
    "popstate",
    (e) => {
      const newTo = baseURL(
        !(e instanceof PopStateEvent) || typeof e.state?.to !== "string"
          ? window.location.pathname
          : e.state.to
      );
      console.log("navigating to", newTo);
      return navigate(newTo);
    },
    window
  );

  const content = use(storeData);

  return <ErrorBoundary>{content as ReactNode}</ErrorBoundary>;
};
// Initialize the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const intitalData = createReactFetcher();

createRoot(rootElement).render(<Shell data={intitalData} />);

/**
 * Error boundary
 */

export class ErrorBoundary extends React.Component {
  public state: {
    hasError: boolean;
    error: Error | null;
  } = {
    hasError: false,
    error: null,
  };
  public props: {
    children: React.ReactNode;
  } = {
    children: null,
  };
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
    this.props = props;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error) {
        return (
          <ErrorMessage
            error={{
              message: this.state.error.message,
              stack: this.state.error.stack,
            }}
          />
        );
      }
      return <div>Error</div>;
    }
    return this.props.children;
  }
}
