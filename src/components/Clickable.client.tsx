"use client";
import React from "react";

export const ClientClickable: React.FC<{
  children: React.ReactNode;
  to?: string;
  href?: string;
}> = ({ children, to, ...props }) => (
  <a
    {...props}
    onClick={(e) => {
      const href = to || props.href;
      const isBlank =
        href?.startsWith("http") ||
        (e.currentTarget &&
          "target" in e.currentTarget &&
          e.currentTarget.target === "_blank");
      if (isBlank) return;
      // Same-document fragment links (the About modal opens on `#!/about` and
      // closes on `#`) must stay with the browser. The modal is shown by CSS
      // `:target`, and only a real fragment navigation updates that: the
      // pushState below changes the URL WITHOUT recomputing `:target`, so an
      // intercepted click would strand the modal open under a fragment-less URL.
      // The router also navigates by pathname alone, which drops the fragment
      // outright — so the modal would never open in the first place.
      const target = new URL(e.currentTarget.href, window.location.href);
      if (
        target.pathname === window.location.pathname &&
        (target.hash || window.location.hash)
      ) {
        return;
      }
      e.preventDefault();
      // Scroll to top on forward navigation (a link click). Doing it here — not
      // on every popstate — means browser back/forward keeps its scroll offset.
      if ("scrollTo" in window) window.scrollTo(0, 0);
      // Use pathname, not full href — the router expects a path like "/10mmc/".
      const newTo =
        e.currentTarget && "href" in e.currentTarget
          ? new URL(e.currentTarget.href).pathname
          : href || "/";
      const newState = { to: newTo };
      window.history.pushState(newState, "", newTo);
      window.dispatchEvent(new PopStateEvent("popstate", { state: newState }));
    }}
  >
    {children}
  </a>
);
