import * as React from "react";
import s from "../../css/8mmc.module.css";
/**
 * Static theme layout for 8mmc. Imports ONLY its CSS module and wraps the whole
 * 8mmc route subtree in the `.Theme` div, so vprs scopes that one module to just
 * these routes — no barrel, no filter. One file themes every 8mmc page.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
