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
      e.preventDefault();
      const href = to || props.href;
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
