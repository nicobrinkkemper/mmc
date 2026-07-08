import * as React from "react";
import s from "../../css/5-6ymm.module.css";
/**
 * Static theme layout for 6ymm. Imports ONLY its CSS module and wraps the whole
 * 6ymm route subtree in the `.Theme` div, so vprs scopes that one module to just
 * these routes — no barrel, no filter. One file themes every 6ymm page.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
