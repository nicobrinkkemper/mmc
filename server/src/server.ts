import { mkdirSync } from 'fs';
import type { Server } from 'http';
import yargs from 'yargs';
import { crawl, getAllPaths } from "./crawler";
import express = require('express');
import historyApiFallback = require('connect-history-api-fallback');

const args = yargs(process.argv.slice(2))
  .command('crawl', 'Crawl the site and exit')
  .option('domain', {
    default: 'localhost'
  })
  .option('build-dir', {
    default: 'build'
  })
  .option('output-dir', {
    default: 'build'
  })
  .option('port', {
    default: 0
  })
  .option('base-path', {
    default: '/'
  })
  .option('include', {
    type: 'array',
    default: []
  })
  .option('exclude', {
    type: 'array',
    default: []
  })
  .option('snapshot-delay', {
    type: 'number',
    default: 50
  })
  .parseSync();

const {
  domain,
  buildDir,
  outputDir,
  port: defaultPort,
  basePath,
  include,
  exclude,
  snapshotDelay,
  _: commands
} = args;

async function main() {
  console.log(`Starting server with domain ${domain} and buildDir ${buildDir}`);

  mkdirSync(outputDir, { recursive: true });

  const app = express();
  app.use(express.static(buildDir));
  app.use(historyApiFallback());
  app.use(express.static(buildDir));

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
    try {
      const paths = await getAllPaths();
      console.log(`🗺️  Found ${paths.length} paths to crawl`);

      for (const path of paths) {
        try {
          await crawl(path, outputDir, port, snapshotDelay);
        } catch (err) {
          console.error(`Failed to crawl ${path}:`, err);
        }
      }

      console.log(`✨ Crawled ${paths.length} pages`);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      console.log('🏁 Server closed');
      process.exit(0);
    }
    return;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});