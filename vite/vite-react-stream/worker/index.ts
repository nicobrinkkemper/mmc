import { register } from 'node:module';
import { Readable, Writable } from 'node:stream';
import { parentPort } from 'node:worker_threads';
import React from 'react';
import ReactDOM from 'react-dom/server.node';
import { createFromNodeStream } from 'react-server-dom-esm/client.node';
import type { RegisterComponentMessage, RenderMessage } from '../types.js';
import { setClientComponents } from './loader.js';

if (!parentPort) throw new Error('Must be run as a worker');

// Virtual module system
const modules = new Map<string, string>();
// Make modules available to loader
(globalThis as any).modules = modules;

// Register virtual module loader
register('data:text/javascript;base64,' + Buffer.from(`
  export function load(url, context, defaultLoad) {
    const id = url.slice('file://'.length);
    console.log('Loading:', { url, id, available: [...globalThis.modules?.keys() ?? []] });
    // Try .tsx.js if .js not found
    const code = globalThis.modules?.get(id) ?? 
                globalThis.modules?.get(id.replace(/\.js$/, '.tsx.js'));
    if (!code) return defaultLoad(url, context, defaultLoad);
    return {
      format: 'module',
      source: code,
      shortCircuit: true
    };
  }
  export function resolve(specifier, context, defaultResolve) {
    console.log('Resolving:', { specifier, available: [...globalThis.modules?.keys() ?? []] });
    // Map .js to .tsx.js
    if (specifier.endsWith('.js')) {
      const tsxSpecifier = specifier.replace(/\.js$/, '.tsx.js');
      if (globalThis.modules?.has(tsxSpecifier)) {
        return {
          url: new URL(tsxSpecifier, 'file:///').href,
          shortCircuit: true
        };
      }
    }
    return defaultResolve(specifier, context, defaultResolve);
  }
`).toString('base64'), {
  parentURL: import.meta.url
});


parentPort.on('message', (msg: RegisterComponentMessage | RenderMessage) => {
  switch (msg.type) {
    case 'REGISTER_COMPONENT':
      setClientComponents({ [msg.id]: msg.code });
      break;
    case 'RENDER':
      try {
        // Register client components
        console.log('Registering components:', Object.keys(msg.clientComponents));
        setClientComponents(msg.clientComponents);

        console.log('Worker: Creating RSC stream');
        const App: React.FC = () => React.use(createFromNodeStream(
          Readable.from(Buffer.from(msg.stream)),
          msg.moduleBasePath,
          msg.moduleBaseURL
        ));

        console.log('Worker: Starting HTML render');
        const stream = ReactDOM.renderToPipeableStream(
          React.createElement(App), 
          {
            ...msg.pipableStreamOptions,
            onAllReady() {
              console.log('Worker: Stream ready');
              let html = '';
              stream.pipe(new Writable({
                write(chunk, _, callback) { 
                  html += chunk;
                  callback();
                },
                final(callback) {
                  console.log('Worker: Stream complete');
                  parentPort!.postMessage({ type: 'COMPLETE', html });
                  callback();
                }
              }));
            },
            onError(error) {
              console.error('Worker: Render error:', error);
              parentPort!.postMessage({ type: 'ERROR', error: String(error) });
            }
          }
        );
      } catch (error) {
        console.error('Worker: Setup error:', error);
        parentPort!.postMessage({ type: 'ERROR', error: String(error) });
      }
      break;
  }
});