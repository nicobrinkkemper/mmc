"use client";
import React, { useCallback } from "react";

type ClientClickableType = ThemeComponent<{}, "a", {
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;


export const ClientClickable: ClientClickableType = ({
  children,
  as: Component = "a",
  to,
  ...props
}) => {
  const href = to || props.href;
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const newTo = e.currentTarget && 'href' in e.currentTarget ? e.currentTarget.href : href;
      const newState = { to: newTo };
      window.history.pushState(newState, "", newTo);
      window.dispatchEvent(new PopStateEvent("popstate", { state: newState }));
    },
    [href]
  );

  return (
    <Component {...props} onClick={handleClick}>
      {children}
    </Component>
  );
};
