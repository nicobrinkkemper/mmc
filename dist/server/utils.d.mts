import type { Request, Response } from "express";
/** Set of paths that have been processed to avoid duplicates */
export declare const visited: Set<string>;
/** Helper to assert type safety for JSDOM Document */
export declare function assertIsDocument(x: unknown): asserts x is Document;
export declare function assertIsHead(x: unknown): asserts x is HTMLHeadElement;
/** Format progress bar */
export declare function formatProgress(current: number, total: number, errors?: number, status?: string): string;
/** Ensure HTML document has DOCTYPE declaration */
export declare function ensureDoctype(html: string): string;
export declare const createReference: (e: string, path: string, directive: string) => string;
export declare const pad: (str: string, n?: number) => string;
export declare const logger: (req: Request, _: unknown, next: Function) => any;
export declare const cors: (_: unknown, res: Response, next: Function) => any;
//# sourceMappingURL=utils.d.mts.map