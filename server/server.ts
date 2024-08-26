import { mkdirSync, writeFileSync } from 'fs';
import type { Server } from 'http';
import { serializeDocument } from 'jsdom';
import { dirname, extname, join } from 'path';
import yargs from 'yargs';
import Crawler = require('react-snapshot/lib/Crawler');
import snapshot = require('react-snapshot/lib/snapshot');
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
  .parseSync()

const { domain, buildDir, outputDir, port: defaultPort, _: commands } = args;
let port = defaultPort;


async function snapshotPage(urlPath: string): Promise<string> {
  const window = await snapshot('http:', `${domain}:${port}`, urlPath, 100) as Window & { react_snapshot_state: any };

  if (Boolean(window.react_snapshot_state)) {
    const stateJSON = JSON.stringify(window.react_snapshot_state)
    const script = window.document.createElement('script')
    script.innerHTML = `window.react_snapshot_state = JSON.parse('${stateJSON}');`
    window.document.head.appendChild(script)
  }

  const html = serializeDocument(window.document)
  write(urlPath, html)
  return html
}

async function crawl(urlPath: string) {
  const crawler = new Crawler(
    'http://' + domain + ':' + port,
    100,
    {
      include: [urlPath],
      exclude: [],
      stripJS: false
    }
  )

  const crawlMax = 50
  const crawlThreads: Promise<void>[] = []

  const handler = ({ urlPath, html }) => {
    write(urlPath, html)
    if (crawlThreads.length < crawlMax) {
      crawlThreads.push(crawler.crawl(handler))
    }
  }
  await crawler.crawl(handler)
  await Promise.all(crawlThreads)
}

function write(urlPath: string, html: string) {
  let filename = urlPath
  if (urlPath.endsWith('/')) {
    filename = `${urlPath}index.html`
  } else if (extname(urlPath) === '') {
    filename = `${urlPath}.html`
  }
  console.log(`✏️   Saving ${urlPath} as ${filename}`)
  const filepath = join(outputDir, filename)
  mkdirSync(dirname(filepath), { recursive: true })
  writeFileSync(filepath, html)
}

async function main() {

  console.log(`Starting server with domain ${domain} and buildDir ${buildDir}`);
  const app = express();

  app.use('/', express.static(buildDir))

  app.get('*', (req, res, next) => {
    const ua = req.headers['user-agent'];
    if (ua?.startsWith('Node.js ')) {
      res.set('Connection', 'close');
      next()
    } else if (req.accepts('text/html')) {
      snapshotPage(req.url).then(html => {
        res.send(html)
      }).catch(err => {
        console.error(err)
        res.status(500).send('Internal Server Error')
      })
    } else {
      next()
    }
  })

  app.use('/',
    historyApiFallback({
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    }),
    express.static(buildDir, { index: 'index.html' })
  )

  const server = await new Promise<Server>((resolve) => {
    const s = app.listen(defaultPort, () => {
      resolve(s)
    })
  })

  const address = server.address();

  port = address === null || typeof address === 'string' ? -1 : address.port;

  if (port === -1) {
    throw new Error('Server failed to start')
  }

  console.log(`Server started on port ${port}`);

  if (commands.includes('crawl')) {
    await crawl('/')
    await new Promise((resolve) => server.close(resolve))
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
});