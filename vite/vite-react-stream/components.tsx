import React from "react";
import type { Manifest } from "vite";

const DefaultHead = ({ manifest }: { manifest?: Manifest }) => {
  if (!manifest) return null;

  const elements: React.ReactElement[] = [];

  Object.values(manifest).forEach((entry) => {
    entry.css?.forEach((css) => {
      elements.push(
        React.createElement("link", {
          key: css,
          rel: "stylesheet",
          href: css,
        })
      );
    });
  });

  return React.createElement(React.Fragment, null, elements);
};

export const DefaultLayout = ({
  children,
  manifest,
}: {
  children: React.ReactNode;
  manifest?: Manifest;
}) => {
  return React.createElement(React.Fragment, null, [
    React.createElement(DefaultHead, { manifest, key: "head" }),
    React.createElement("div", { key: "content" }, children),
  ]);
};
