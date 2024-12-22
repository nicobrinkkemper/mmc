interface ReadableSignal<T> {
  value: T; // Direct value access
  peek(): T; // Read without subscription
  subscribe(fn: (value: T, prev: T) => void): () => void;
  [Symbol.observable](): Observable<T>; // Observable compatibility
}

export function createCsvSignals(rows: string[][], headers: string[]) {
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
