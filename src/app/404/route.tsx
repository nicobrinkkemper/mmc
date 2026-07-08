/**
 * `/404` sits above the `$theme` segment, so reuse the dynamic theme layout
 * directly — its loader props (this segment's `props.ts`) carry `pathInfo.theme`.
 */
export { Layout } from "../$theme/route.js";
