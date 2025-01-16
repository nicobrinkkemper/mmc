import type { FC, PropsWithChildren, ReactElement } from "react";
import { createElement, Fragment } from "react";
import type { Manifest } from "vite";

const DefaultHead = ({ manifest }: { manifest?: Manifest }) => {
    if (!manifest) return null;

    const elements: ReactElement[] = [];

    Object.values(manifest).forEach((entry) => {
        entry.css?.forEach((css) => {
            elements.push(
                createElement("link", {
                    key: css,
                    rel: "stylesheet",
                    href: css,
                })
            );
        });
    });

    return createElement(Fragment, null, elements);
};

export const DefaultHtml: FC<PropsWithChildren<{ manifest?: Manifest }>> = ({ children, manifest }) => {
    return createElement(Fragment, null, [
        createElement(DefaultHead, { manifest, key: "head" }),
        children,
    ]);
}; 