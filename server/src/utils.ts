/** Set of paths that have been processed to avoid duplicates */
export const visited = new Set<string>();

/** Helper to assert type safety for JSDOM Document */
export function assertIsDocument(x: unknown): asserts x is Document {
    if (!x || typeof x !== 'object' || !('documentElement' in x)) {
        throw new Error(`Expected Document but got: ${x}`);
    }
}

/** Format progress bar */
export function formatProgress(current: number, total: number, errors: number = 0, status: string = ''): string {
    const width = 30;
    const percent = current / total;
    const filled = Math.round(width * percent);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    const statusSymbol = status === 'active' ? '*' :
        status === 'done' ? '√' :
            status === 'error' ? 'x' : ' ';
    const errorText = errors > 0 ? ` (${errors} failed)` : '';
    return `${statusSymbol} [${bar}] ${current}/${total}${errorText}`;
}