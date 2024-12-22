import { set } from "lodash-es";
import { csvParse } from "./csvParse.js";

/**
 * Creates a processor for CSV data that supports both static and live processing
 */
export function createCsvProcessor<
  const T extends Record<string, any>,
  const M extends {
    [K in keyof T]: {
      path: string;
      transform: (value: string) => any;
    };
  }
>(options: {
  mappers: M;
  live?: boolean;
  onUpdate?: (data: ExtractPathTypes<M>) => void;
}) {
  let currentData: ExtractPathTypes<M> | null = null;
  let subscribers = new Set<(data: ExtractPathTypes<M>) => void>();

  /**
   * Process CSV data and return typed result
   */
  function processData(csv: string): ExtractPathTypes<M> {
    const [headers, ...rows] = csvParse(csv, { typed: true });
    const result = {} as Record<string, any>;
    let currentRowIndex = 0;

    rows.forEach((row) => {
      headers.forEach((header, colIndex) => {
        const mapper = options.mappers[header as keyof T];
        if (mapper) {
          const value = mapper.transform(row[colIndex] as string);
          const path = mapper.path.replace(/\$index/g, String(currentRowIndex));
          set(result, path, value);
        }
      });
      currentRowIndex++;
    });

    if (options.live) {
      currentData = result as ExtractPathTypes<M>;
      notifySubscribers();
    }

    return result as ExtractPathTypes<M>;
  }

  /**
   * Subscribe to data updates (live mode only)
   */
  function subscribe(callback: (data: ExtractPathTypes<M>) => void) {
    if (!options.live) {
      throw new Error("Subscribe is only available in live mode");
    }
    subscribers.add(callback);
    if (currentData) {
      callback(currentData);
    }
    return () => subscribers.delete(callback);
  }

  /**
   * Notify subscribers of data updates
   */
  function notifySubscribers() {
    if (currentData) {
      subscribers.forEach((callback) => callback(currentData!));
      options.onUpdate?.(currentData);
    }
  }

  return {
    processData,
    subscribe,
    getCurrentData: () => currentData,
  };
}
