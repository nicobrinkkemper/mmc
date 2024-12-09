import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parentPort, workerData } from 'worker_threads';
import snapshot from './snapshot.js';

const { paths, port, outputDir, workerId } = workerData;

/** Process paths sequentially to avoid memory pressure */
async function processPath(path: string, index: number) {
    try {
        // Send 'active' status before starting
        parentPort?.postMessage({
            path,
            index,
            status: 'active'
        });

        const html = await snapshot('http', 'localhost', path, 0, port);
        const outputPath = join(outputDir, path.replace(/^\//, ''), 'index.html');
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, html);

        parentPort?.postMessage({
            path,
            index: index + 1,
            status: index === paths.length - 1 ? 'done' : 'active'
        });
    } catch (err) {
        parentPort?.postMessage({
            path,
            index: index + 1,
            status: 'error'
        });
    }
}

// Process paths sequentially
paths.reduce(async (promise, path, index) => {
    await promise;
    await processPath(path, index);

    // Send final status when worker completes all paths
    if (index === paths.length - 1) {
        parentPort?.postMessage({
            path,
            index: index + 1,
            status: 'done'  // New status
        });
    }
}, Promise.resolve()); 