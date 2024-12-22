declare global {
  // studying new signal spec, nvm me
  interface Observable<T> {
    subscribe(observer: { next: (value: T) => void }): {
      unsubscribe: () => void;
    };
  }
  interface SymbolConstructor {
    readonly observable: unique symbol;
  }
  interface ReadableSignal<T> {
    value: T; // Direct value access
    peek(): T; // Read without subscription
    subscribe(fn: (value: T, prev: T) => void): () => void;
    [Symbol.observable](): Observable<T>; // Observable compatibility
  }
}

export {};
