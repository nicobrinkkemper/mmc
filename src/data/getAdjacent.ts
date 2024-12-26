export function getAdjacent<T extends unknown[], K extends Primitive>(
  items: [...T],
  indexOrKey: K
) {
  const index =
    typeof indexOrKey === "number"
      ? indexOrKey
      : typeof indexOrKey === "string"
      ? items.indexOf(indexOrKey as any)
      : -1;
  return {
    next:
      index + 1 < items.length
        ? ({
            exists: true,
            value: items[index + 1],
          } as Exists<T[number]>)
        : ({
            exists: false,
          } as NotExists),
    prev:
      index - 1 >= 0
        ? ({
            exists: true,
            value: items[index - 1],
          } as Exists<T[number]>)
        : ({
            exists: false,
          } as NotExists),
  } as Adjacent<T>;
}
