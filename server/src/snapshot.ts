/* Wraps a jsdom call and returns the full page */

import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { TextDecoder, TextEncoder } from 'util';

class MessageChannelPolyfill {
    port1: any;
    port2: any;
    constructor() {
        this.port1 = { postMessage: () => { } };
        this.port2 = { postMessage: () => { } };
    }
}

// Cache script content
const scriptContent = (() => {
    const indexHtml = readFileSync(join(process.cwd(), 'build', 'index.html'), 'utf8');
    const scriptMatch = indexHtml.match(/src="(\/static\/js\/main\.[^"]+)"/);
    if (!scriptMatch) {
        throw new Error('Could not find main script in index.html');
    }
    const scriptPath = scriptMatch[1];
    return readFileSync(join(process.cwd(), 'build', scriptPath.slice(1)), 'utf8');
})();

export default (protocol: string, host: string, path: string, delay: number, port: number) => {
    return new Promise((resolve, reject) => {
        const url = `${protocol}//${host}:${port}${path}`;

        const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', {
            url,
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true,
            beforeParse(window: any) {
                window.MessageChannel = MessageChannelPolyfill;
                window.TextEncoder = TextEncoder;
                window.TextDecoder = TextDecoder;
                window.reactSnapshotRender = () => resolve(window);
            }
        });

        const scriptEl = dom.window.document.createElement('script');
        scriptEl.textContent = scriptContent;
        dom.window.document.head.appendChild(scriptEl);

        // Shorter timeout
        setTimeout(() => reject(new Error("Render timeout")), delay);
    });
};
