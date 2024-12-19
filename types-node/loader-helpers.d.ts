declare global {
  type LoadContext = {
    conditions: Array<string>;
    format: string | null | void;
    importAssertions: Object;
  };

  type LoadFunction = (
    _arg0: string,
    _arg1: LoadContext,
    _arg2: LoadFunction
  ) => Promise<{ format: string; shortCircuit?: boolean; source: Source }>;

  type Source = string | ArrayBuffer | Uint8Array;

  type ExportedEntry = {
    localName: string;
    exportedName: string;
    type: null | string;
    loc: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
    originalLine: number;
    originalColumn: number;
    originalSource: number;
    nameIndex: number;
  };
}

export {};
