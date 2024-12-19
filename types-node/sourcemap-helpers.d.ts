declare global {
  /**
   * Interface for source map structure
   */
  interface SourceMap {
    version: number;
    file: string;
    mappings: string;
    sources: (string | null)[];
    sourcesContent?: (string | null)[];
    names: (string | null)[];
  }

  /**
   * Interface for the result of source and map generation
   */
  interface SourceAndMapResult {
    source: string;
    map: SourceMap | null;
  }

  /**
   * Type definition for the chunk callback function
   */
  type ChunkCallback = (
    chunk: string | undefined,
    generatedLine: number,
    generatedColumn: number,
    sourceIndex: number,
    originalLine: number,
    originalColumn: number,
    nameIndex: number
  ) => void;

  /**
   * Type definition for the source callback function
   */
  type SourceCallback = (
    sourceIndex: number,
    source: string,
    sourceContent?: string
  ) => void;

  /**
   * Type definition for the name callback function
   */
  type NameCallback = (nameIndex: number, name: string) => void;

  /**
   * Interface for input source object
   */
  interface InputSource {
    streamChunks: (
      options: Record<string, unknown>,
      chunkCallback: ChunkCallback,
      sourceCallback: SourceCallback,
      nameCallback: NameCallback
    ) => { source?: string };
  }

  /**
   * Options for creating a mappings serializer
   */
  interface SerializerOptions {
    columns?: boolean;
  }

  /**
   * Type definition for mapping serializer function
   */
  type MappingSerializer = (
    generatedLine: number,
    generatedColumn: number,
    sourceIndex: number,
    originalLine: number,
    originalColumn: number,
    nameIndex: number
  ) => string;

  type ResolveContext = {
    conditions: Array<string>;
    parentURL: string | void;
  };

  type ResolveFunction = (
    _arg0: string,
    _arg1: ResolveContext,
    _arg2: ResolveFunction
  ) => { url: string } | Promise<{ url: string }>;

  type GetSourceContext = {
    format: string;
  };

  type GetSourceFunction = (
    _arg0: string,
    _arg1: GetSourceContext,
    _arg2: GetSourceFunction
  ) => Promise<{ source: Source }>;

  type TransformSourceContext = {
    format: string;
    url: string;
  };

  type TransformSourceFunction = (
    _arg0: Source,
    _arg1: TransformSourceContext,
    _arg2: TransformSourceFunction
  ) => Promise<{ source: Source }>;

  /**
   * Type definition for the mapping callback function
   */
  type MappingCallback = (
    generatedLine: number,
    generatedColumn: number,
    sourceIndex: number,
    originalLine: number,
    originalColumn: number,
    nameIndex: number
  ) => void;
}
export {};
