/**
 * Converts CSV data into an array of records using first row as headers
 * @param data Raw CSV data array
 */
export function csvToArray<T extends Record<string, any>>(
  data: string[][]
): T[] {
  const [headers, ...rows] = data;

  return rows.map((row) =>
    Object.fromEntries(headers.map((header, i) => [header, row[i]]))
  ) as T[];
}
