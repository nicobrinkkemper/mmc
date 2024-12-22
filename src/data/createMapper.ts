/**
 * Creates a CSV reviver function from a mapper configuration
 */
export function createMapper<
  const M extends Record<string, (val: string) => any>,
  const R
>(config: {
  mappers: {
    [K in keyof M]: M[K];
  };
  transform: (rows: InferMapperTypes<M>, index: number) => R;
}): (rows: any) => R {
  let currentRow: any = {};
  let rowIndex = 0;

  return (value: string, header?: string) => {
    if (!header) return value;

    const mapper = config.mappers[header as keyof M];
    if (!mapper) return value;

    currentRow[header] = mapper(String(value));

    if (Object.keys(currentRow).length === Object.keys(config.mappers).length) {
      const result = config.transform(currentRow, rowIndex++);
      currentRow = {};
      return result;
    }
    return value as any;
  };
}
