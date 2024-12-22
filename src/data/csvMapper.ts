/**
 * Type for a single field mapper function
 */
type FieldMapper<T> = (
  value: string,
  header?: string,
  row?: number,
  col?: number
) => T;

/**
 * Type for a collection of field mappers with optional default
 */
type Mappers<T> = {
  [K in keyof T]: FieldMapper<T[K]>;
} & {
  default?: FieldMapper<T[keyof T]>;
};

/**
 * Type for the mapper function returned by createCsvMapper
 */
type CsvMapper<T> = {
  (value: string): (value: string) => T[keyof T];
  (value: string, header: keyof T): T[keyof T];
  (value: string, header: keyof T, row: number, col: number): T[keyof T];
};

/**
 * Creates a mapper function for CSV data with type-safe header mapping
 */
export function createCsvMapper<T>(mappers: Mappers<T>): CsvMapper<T> {
  return function mapper(
    value: string,
    header?: keyof T,
    row?: number,
    col?: number
  ): T[keyof T] | ((value: string) => T[keyof T]) {
    if (!header) {
      return ((val: string) => mappers[value as keyof T]?.(val) ?? val) as (
        value: string
      ) => T[keyof T];
    }

    return (mappers[header]?.(value, header as string, row, col) ??
      mappers.default?.(value, header as string, row, col) ??
      value) as T[keyof T];
  } as CsvMapper<T>;
}
