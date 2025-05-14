import type React from "react";

type MapType = <T extends unknown[]>({
  children,
  items,
}: {
  children: (item: T[number], index: number, items: T[]) => React.ReactNode;
  items: [...T];
}) => React.ReactNode;

export const Map: MapType = ({ children, items }) =>
  items?.map(children as never) ?? null;
