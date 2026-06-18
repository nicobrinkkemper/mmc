"use client";
import React, {
  useCallback,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createReactFetcher } from "vite-plugin-react-server/utils";
import { useRscHmr } from "virtual:react-server/hmr";
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
  initialNode: ReactNode;
}> = ({ initialNode }) => {
  const [, startTransition] = useTransition();
  const [content, setContent] = useState<ReactNode>(initialNode);

  const refetch = useCallback((to: string, scrollToTop = true) => {
    if (scrollToTop && "scrollTo" in window) window.scrollTo(0, 0);
    // Resolve the next route's payload to a ReactNode *before* swapping it in,
    // so the render stays synchronous (no Suspense boundary, no `use()`) and
    // never flashes an empty tree — the same decode-then-render path as the
    // initial mount below.
    Promise.resolve(
      createReactFetcher({
        url: to,
        moduleBaseURL: import.meta.env.BASE_URL,
        publicOrigin: import.meta.env.PUBLIC_ORIGIN,
      })
    ).then((node) => {
      startTransition(() => setContent(node as ReactNode));
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
      return refetch(newTo);
    },
    window
  );

  // RSC HMR: refetch the stream when server components or CSS modules change.
  // scrollToTop=false preserves the user's scroll position across edits.
  useRscHmr((url) => refetch(url, false));

  return <ErrorBoundary>{content}</ErrorBoundary>;
};
// Initialize the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Fully resolve the initial payload to a ReactNode *before* mounting, then
// render that node directly — a synchronous first render with no Suspense
// boundary, so hydrateRoot matches the prerendered HTML exactly. (Wrapping the
// root in a <Suspense> the server never rendered, or `use()`-ing a pending
// thenable, mismatches the prerender → React #418.) With the build's inlined
// flight payload, createReactFetcher decodes in place with no network
// round-trip; without it (e.g. dev) it falls back to fetching index.rsc.
Promise.resolve(
  createReactFetcher({
    url: window.location.pathname,
    moduleBaseURL: import.meta.env.BASE_URL,
    publicOrigin: import.meta.env.PUBLIC_ORIGIN,
  })
).then(
  (initialNode) => {
    // Hydrate the prerendered HTML when present; fall back to a fresh client
    // render when #root is empty (e.g. dev without prerender).
    if (rootElement.hasChildNodes()) {
      hydrateRoot(rootElement, <Shell initialNode={initialNode as ReactNode} />);
    } else {
      createRoot(rootElement).render(
        <Shell initialNode={initialNode as ReactNode} />
      );
    }
  },
  (err) => {
    // Stay on the prerendered static HTML rather than mounting a broken tree;
    // links fall back to normal full-page navigation.
    console.error("[mmc] initial RSC payload failed to load; staying static", err);
  }
);

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

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    console.log("newModule", newModule);
    if (newModule) {
      // newModule is undefined when SyntaxError happened
      console.log("updated: count is now ", newModule["count"]);
    }
  });
}
