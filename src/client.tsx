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

const boot = () =>
  startClient({
    moduleBaseURL: import.meta.env.BASE_URL,
    publicOrigin: import.meta.env.PUBLIC_ORIGIN,
    wrap: (node: React.ReactNode) => <ErrorBoundary>{node}</ErrorBoundary>,
  });

/**
 * WORKAROUND, pending a fix in vite-plugin-react-server.
 *
 * `startClient` reads the initial flight payload out of the inlined
 * `<script id="vprs-flight">` element as soon as it runs. This entry is emitted
 * as `<script type="module" async>`, so its execution is not ordered against the
 * HTML parser: once the module is in cache (a repeat visit, or navigating away
 * from a still-loading page) it can run while the parser is still streaming text
 * into that script element. It then decodes a TRUNCATED payload — measured at
 * 1319 of 22088 chars — React reaches the end of an incomplete flight stream and
 * throws #412 ("Connection closed"), and the page stays un-hydrated until a
 * reload: no client-side navigation at all.
 *
 * A fully parsed document is what makes the payload whole, so wait for one.
 * Remove this once the plugin defers the read itself.
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
