import type * as React from "react";
import s from "../../css/10mmc.module.css";
/**
 * Static theme layout for 10mmc. Imports ONLY its CSS module and wraps the whole
 * 10mmc route subtree in the `.Theme` div, so vprs scopes that one module to just
 * these routes — no barrel, no filter. One file themes every 10mmc page.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
