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
      if (!isBlank) {
        e.preventDefault();
      }
      const newTo =
        e.currentTarget && "href" in e.currentTarget
          ? e.currentTarget.href
          : href;
      const newState = { to: newTo };
      window.history.pushState(newState, "", newTo);
      window.dispatchEvent(new PopStateEvent("popstate", { state: newState }));
    }}
  >
    {children}
  </a>
);
