"use server";
import { argv } from "node:process";
import { createElement } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server.node";

export const Page = renderToPipeableStream(
  createElement("div", null, "Server Component"),
  argv.slice(2)[0]
);

console.log(argv.slice(2)[0]);
