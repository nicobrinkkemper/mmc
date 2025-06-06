export function getAdjacent<T extends unknown[]>(
  items: T,
  indexOrKey: number | string
): {
  adjacent: Adjacent<T>;
} {
  const index =
    typeof indexOrKey === "number"
      ? indexOrKey
      : typeof indexOrKey === "string"
      ? items.indexOf(indexOrKey as any)
      : -1;
  if (index === -1) {
    throw new Error(
      `Invalid index or key: ${indexOrKey}. Available keys: ${items.join(", ")}`
    );
  }
  return {
    adjacent: {
      next:
        index + 1 < items.length && items[index + 1]
          ? ({
              exists: true,
              value: items[index + 1],
            } as Exists<T[number]>)
          : ({
              exists: false,
            } as NotExists),
      prev:
        index - 1 >= 0 && items[index - 1]
          ? ({
              exists: true,
              value: items[index - 1],
            } as Exists<T[number]>)
          : ({
              exists: false,
            } as NotExists),
    },
  } as { adjacent: Adjacent<T> };
}
