const humanReadableArray = <ARR extends readonly string[]>(a: ARR):string => {
  if (a.length === 1) return a[0];
  return [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
};

export { humanReadableArray };
