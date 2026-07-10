// Isomorphic URL config — no vprs helpers, so it resolves identically under the
// react-server condition or not. `import.meta.env` is statically replaced by
// Vite in the app build (BASE_URL is Vite's own `base`), but it's UNDEFINED in a
// plain-Node context — e.g. the tsc-built startup (startup/csv/batchProcessor.ts
// imports `baseURL`). So read it defensively (dot access, so Vite still bakes
// it) and fall back to process.env / defaults in Node.
const fromMeta = (): { base?: string; origin?: string } => {
  try {
    return {
      base: import.meta.env.BASE_URL,
      origin: import.meta.env.PUBLIC_ORIGIN,
    };
  } catch {
    return {};
  }
};
// `||` (not `??`): vprs bakes import.meta.env.PUBLIC_ORIGIN to "" when the plugin
// config sets no publicOrigin, and an empty string must fall through to the
// default too (the old env.server read process.env, which is *undefined*, so ??
// worked there — import.meta.env bakes "").
const meta = fromMeta();
const base = meta.base || process.env["VITE_BASE_URL"] || "/";
const origin =
  meta.origin || process.env["VITE_PUBLIC_ORIGIN"] || "https://mmcelebration.com";

const isAbsolute = (path: string): boolean =>
  /^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//");

/**
 * Prefix a path with the deploy base (`/mmc/foo`); absolute URLs pass through.
 *
 * De-dupes: a path that ALREADY carries the base is returned unchanged instead
 * of double-prefixed. Vite asset URLs (e.g. `images.favicon.src`) already
 * include the deploy base, so without this `absoluteURL(images.favicon.src)`
 * produced `/mmc/mmc/…/favicon.ico`.
 */
export const baseURL = (path: string): string => {
  if (isAbsolute(path)) return path;
  const b = base.replace(/\/+$/, ""); // "/mmc" (or "" for root base "/")
  const p = path.startsWith("/") ? path : `/${path}`;
  if (b && (p === b || p.startsWith(`${b}/`))) return p;
  return new URL(p.replace(/^\/+/, ""), `http://_/${base.replace(/^\/+/, "")}`)
    .pathname;
};

/** `baseURL`, resolved absolute against the public origin. */
export const absoluteURL = (path: string): string =>
  isAbsolute(path) ? path : new URL(baseURL(path), origin).toString();
