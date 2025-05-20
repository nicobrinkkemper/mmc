/**
 * Creates a CSV reviver function from a mapper configuration
 */
export const createMapper: CreateMapperFn = (config) => {
  let rowIndex = 0;

  return (row) => {
    // Map each field using its corresponding mapper
    const mappedRow = Object.entries(row).reduce((acc, [header, value]) => {
      const mapper = config.mappers[header];
      if (mapper) {
        acc[header] = mapper(String(value));
      }
      return acc;
    }, {} as any);

    const transformed = config.transform(mappedRow, rowIndex++);

    return transformed;
  };
};
