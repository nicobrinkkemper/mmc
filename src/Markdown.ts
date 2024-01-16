import { createElement } from "react";
import { htmdx } from "htmdx";
import styles from "./Markdown.module.css";

export const Markdown = ({ children }: { children: string }) =>
  htmdx(`<div className="${styles.Markdown}">${children}</div>`, createElement);
