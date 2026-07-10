import * as React from "react";
import s from "../../css/4ymm.module.css";
/**
 * Static theme layout for 4ymm. Imports ONLY 4ymm's CSS module and wraps the
 * whole 4ymm route subtree (home + credits + the levels tree) in its `.Theme`
 * div, so vprs scopes that one module to just these routes — no all-themes
 * barrel, no MmcRoot filter. This single file is the boilerplate the layout
 * feature deletes: it themes every 4ymm page at once.
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className={s["Theme"]}>{children}</div>
);
