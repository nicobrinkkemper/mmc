import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import snapshot from './snapshot';
import * as themes from './themes.json';
import * as themeKeys from './themesKeys.json';

const visited = new Set<string>();

async function getAllPaths(): Promise<string[]> {
    const paths: string[] = ['/'];

    // Add main sections
    themeKeys.forEach((key: string) => {
        const theme = themes[key];
        paths.push(`/${key}`);
        paths.push(`/${key}/levels`);
        paths.push(`/${key}/credits`);

        // Add all level pages based on batches
        theme.batches?.forEach((batch) => {
            batch.levels?.forEach((level, index) => {
                paths.push(`/${key}/level/${batch.batchNumber}/${index + 1}`);
            });
        });
    });

    return paths;
}

/**
 * Processes an array of items with a concurrency limit
 */
async function processInBatches<T>(items: T[], processor: (item: T) => Promise<void>, concurrency = 5) {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += concurrency) {
        chunks.push(items.slice(i, i + concurrency));
    }

    for (const chunk of chunks) {
        await Promise.all(chunk.map(processor));
    }
}

async function crawl(url: string, buildDir: string, port: number, delay: number = 1000): Promise<void> {
    if (visited.has(url)) {
        console.log('👍 Already scraped:', url);
        return;
    }

    try {
        console.log('🕷️  Crawling:', url);
        const window = await snapshot('http:', 'localhost', url, delay, port) as Window;

        const fileName = url === '/' ? 'index.html' : `${url}/index.html`;
        const filePath = join(buildDir, fileName);

        mkdirSync(join(buildDir, url), { recursive: true });
        writeFileSync(filePath, window.document.documentElement.outerHTML);
        console.log('✅ Saved:', fileName);

        visited.add(url);
    } catch (error) {
        console.error('❌ Error crawling', url, error);
    }
}

export { crawl, getAllPaths, processInBatches };
