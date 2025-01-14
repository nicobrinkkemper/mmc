import { Page } from "./page/page.js";
import { props } from "./page/props.js";

export const rscConfig = {
  page: Page,
  props: props,
} as const;
