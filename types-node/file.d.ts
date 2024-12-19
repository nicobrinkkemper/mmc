declare global {
  export type FileReference = { path: string; size: number };
  export type FileReferences = FileReference[];
}

export {};
