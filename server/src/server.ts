import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import { mkdirSync } from 'fs';
import type { Server } from 'http';
import yargs from 'yargs';
import { getAllPaths, processInBatches } from "./crawler.js";

const args = await yargs(process.argv.slice(2))
  .command('crawl [args..]', 'Crawl the site and exit', (yargs) => {
    return yargs.positional('args', {
      describe: 'Arguments to pass to crawler',
      type: 'string',
      array: true
    });
  })
  .option('build-dir', {
    default: 'build'
  })
  .option('output-dir', {
    default: 'build'
  })
  .option('port', {
    type: 'number'
  })
  .parse();

const getBasePath = () => process.env.PUBLIC_URL || '';
const basePath = getBasePath();

const {
  'build-dir': buildDir,
  'output-dir': outputDir,
  port: defaultPort,
  _: commands,
  args: crawlArgs = []
} = args;

async function main() {
  const startTime = Date.now();

  mkdirSync(outputDir, { recursive: true });

  const app = express();

  console.log(`Starting server with buildDir ${buildDir} and basePath ${basePath || '/'}`);
  app.use(basePath, express.static(buildDir));
  app.use(historyApiFallback());
  app.use(basePath, express.static(buildDir));

  const server = await new Promise<Server>((resolve) => {
    const s = app.listen(defaultPort, () => resolve(s));
  });

  const address = server.address();
  const port = address === null || typeof address === 'string' ? -1 : address.port;

  if (port === -1) {
    throw new Error('Server failed to start');
  }

  console.log(`Server started on port ${port}`);

  if (commands.includes('crawl')) {
    let crawlError: Error | null = null;
    try {
      const paths = await getAllPaths();
      console.log(`🗺️  Found ${paths.length} paths to crawl`);

      await processInBatches(paths, port, outputDir);

      const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`✨ Crawled ${paths.length} pages in ${totalTime}s (avg ${(Number(totalTime) / paths.length * 1000).toFixed(1)}ms per page)`);
    } catch (err) {
      crawlError = err as Error;
      console.error('Crawl failed:', err);
    } finally {
      // Ensure server closes properly
      await new Promise<void>((resolve) => {
        server.close(() => {
          console.log('🏁 Server closed');
          resolve();
        });
      });

      // Exit with error if crawl failed
      if (crawlError) {
        process.exit(1);
      }
      process.exit(0);
    }
    return;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});