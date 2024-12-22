import { csvParse } from "./csvParse.js";

export function createCsvSignals(csv: string) {
  const [headers, ...rows] = csvParse(csv, { typed: true });

  return new Proxy(
    {},
    {
      get(_, path: string): ReadableSignal<any> {
        let value: any;
        let subscribers = new Set<(value: any, prev: any) => void>();

        return {
          get value() {
            if (value === undefined) {
              const columnIndex = headers.indexOf(path);
              // Uses our parsed CSV data directly
              value =
                columnIndex >= 0 ? rows.map((row) => row[columnIndex]) : [];
            }
            return value;
          },
          peek() {
            return value;
          },
          subscribe(fn) {
            subscribers.add(fn);
            return () => subscribers.delete(fn);
          },
          [Symbol.observable]() {
            return {
              subscribe: (observer: { next: (value: any) => void }) => ({
                unsubscribe: this.subscribe((value) => observer.next(value)),
              }),
            };
          },
        };
      },
    }
  );
}
