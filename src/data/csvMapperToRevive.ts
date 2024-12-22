export function csvMapperToReviver<
  M extends Record<string, (val: string) => any>
>(config: {
  mappers: M;
  transform: (row: InferMapperTypes<M>, index: number) => any;
}): CsvReviver {
  const rows: Record<string, any>[] = [];
  let currentRow: Record<string, any> = {};

  return (value, header, _row) => {
    if (!header) return value;

    const mapper = config.mappers[header];
    if (!mapper) return value;

    currentRow[header] = mapper(String(value));

    if (Object.keys(currentRow).length === Object.keys(config.mappers).length) {
      const result = config.transform(currentRow as any, rows.length);
      rows.push(currentRow);
      currentRow = {};
      return result;
    }

    return value;
  };
}
