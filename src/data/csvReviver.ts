/**
 * CSV reviver function with overloads for different parameter counts
 * @param value The value to process
 * @param header Optional header name
 * @param row Optional row number
 * @param col Optional column number
 */
export function csvReviver<T = string>(
  value: string
): T | ((value: string) => T);
export function csvReviver<T = Record<string, string>>(
  value: string,
  header: string
): T;
export function csvReviver<T = Record<string, string>>(
  value: string,
  header: string,
  row: number,
  col: number
): T;
export function csvReviver<T>(
  value: string,
  header?: string,
  _row?: number,
  _col?: number
): T | ((value: string) => T) {
  if (!header) {
    // First row (header) - return function for processing subsequent rows
    return (val: string) => ({ [value]: val } as T);
  }
  return { [header]: value } as T;
}
