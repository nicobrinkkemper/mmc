import type * as React from "react";
import s from "../../css/5-6ymm.module.css";
/**
 * Static theme layout for 5ymm. Imports ONLY its CSS module and wraps the whole
 * 5ymm route subtree in the `.Theme` div, so vprs scopes that one module to just
 * these routes — no barrel, no filter. One file themes every 5ymm page.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
