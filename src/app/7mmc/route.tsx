import type * as React from "react";
import s from "../../css/7mmc.module.css";
/**
 * Static theme layout for 7mmc. Imports ONLY its CSS module and wraps the whole
 * 7mmc route subtree in the `.Theme` div, so vprs scopes that one module to just
 * these routes — no barrel, no filter. One file themes every 7mmc page.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
