/**
 * Converts CSV array data into a Record with specified key
 * @param data Array of CSV entries
 * @param keyField Name of field to use as record key
 */
export function csvToRecords<T extends Record<string, any>>(
  data: T[],
  keyField: keyof T
): Record<string, T> {
  return data.reduce((acc, row) => {
    const key = String(row[keyField]);
    acc[key] = row;
    return acc;
  }, {} as Record<string, T>);
}
