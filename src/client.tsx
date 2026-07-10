"use client";
import * as React from "react";
import { startClient } from "vite-plugin-react-server/router/client";
import { ErrorMessage } from "./ErrorMessage.js";
import "./globalStyles.css";

/**
 * mmc client entry.
 *
 * vprs's `startClient` is the supplied client entry: it assembles the headless
 * router, initial-flight hydration (consuming the inlined payload on first
 * paint), client-side navigation, and RSC HMR. So the whole hand-rolled Shell /
 * popstate handler / refetch / hydrateRoot boilerplate collapses to one call —
 * the ErrorBoundary is injected through `wrap`.
 *
 * Navigation still flows through the existing <ClientClickable> links: they
 * pushState + dispatch popstate, which the router listens for. mmc reads route
 * params from the loader (props), not useParams, so no `patterns` are needed.
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.state.error ? (
        <ErrorMessage
          error={{
            message: this.state.error.message,
            stack: this.state.error.stack,
          }}
        />
      ) : (
        <div>Error</div>
      );
    }
    return this.props.children;
  }
}

startClient({
  moduleBaseURL: import.meta.env.BASE_URL,
  publicOrigin: import.meta.env.PUBLIC_ORIGIN,
  wrap: (node: React.ReactNode) => <ErrorBoundary>{node}</ErrorBoundary>,
});
