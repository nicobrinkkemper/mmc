import { mkdir, writeFile } from 'fs/promises';
import os from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import snapshot from './snapshot.js';
import themes from './themes.json' assert { type: 'json' };
import themeKeys from './themesKeys.json' assert { type: 'json' };
import { assertIsDocument, formatProgress } from './utils.js';

// Fix for ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
async function processInBatches(
    items: string[],
    port: number,
    outputDir: string
) {
    const uniquePaths = Array.from(new Set(items));
    const workersCount = Math.max(1, os.cpus().length - 1);

    console.log(`\nProcessing ${uniquePaths.length} pages...`);
    const workerProgress = Array(workersCount).fill(null).map(() => ({
        current: 0,
        total: 0,
        currentPath: '',
        status: 'active',
        errors: 0
    }));

    const itemsPerWorker = Math.ceil(uniquePaths.length / workersCount);
    const workers = Array(workersCount).fill(null).map((_, index) => {
        const start = index * itemsPerWorker;
        const end = Math.min(start + itemsPerWorker, uniquePaths.length);
        const workerPaths = uniquePaths.slice(start, end);
        workerProgress[index].total = workerPaths.length;

        return new Promise((resolve, reject) => {
            const worker = new Worker(join(__dirname, 'worker.js'), {
                workerData: { paths: workerPaths, port, outputDir }
            });

            worker.on('message', (msg) => {
                workerProgress[index].current = msg.index;
                workerProgress[index].currentPath = msg.path;
                workerProgress[index].status = msg.status;
                if (msg.error) workerProgress[index].errors++;

                process.stdout.write(`\x1B[${workersCount + 1}A`);
                console.log('Processing pages...');
                workerProgress.forEach(p => {
                    if (p.total > 0) {
                        const progress = formatProgress(p.current, p.total, p.errors, p.status);
                        process.stdout.write('\x1B[2K');
                        console.log(`${progress} ${p.currentPath}`);
                    }
                });
            });

            worker.on('error', reject);
            worker.on('exit', (code) => code === 0 ? resolve(null) : reject(new Error(`Worker exited with code ${code}`)));
        });
    });

    await Promise.all(workers);
    process.stdout.write('\n');
}

async function crawl(path: string, outputDir: string, port: number, delay: number, retries = 3) {
    try {
        const document = await snapshot('http', 'localhost', path, delay, port);
        assertIsDocument(document);
        const html = document.documentElement.outerHTML;
        const outputPath = join(outputDir, path.replace(/^\//, ''), 'index.html');
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, html);
    } catch (err) {
        console.error(`❌ Error crawling ${path}:`, err);
    }
}



export { crawl, getAllPaths, processInBatches };
