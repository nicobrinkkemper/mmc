import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { ensureDoctype } from './utils.js';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

// Initialize immediately when module is loaded
const buildAssets = (() => {
    const indexHtml = readFileSync(join(process.cwd(), 'build', 'index.html'), 'utf8');
    const cssRegex = new RegExp(`href="${PUBLIC_URL}(\\/static\\/css\\/main\\.[^"]+\\.css)"`);
    const mainCssPath = indexHtml.match(cssRegex)?.[1];

    if (!mainCssPath) {
        throw new Error('Could not find CSS path in index.html');
    }

    const mainCssContent = readFileSync(join(process.cwd(), 'build', mainCssPath), 'utf8');
    const criticalStyle = indexHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] || '';
    const scriptRegex = new RegExp(`src="${PUBLIC_URL}(\\/static\\/js\\/main\\.[^"]+)"`);
    const scriptPath = indexHtml.match(scriptRegex)?.[1] || '';

    return {
        criticalCss: criticalStyle,
        mainCss: mainCssContent,
        scriptPath
    };
})();

// Define at the top level
class MessageChannelPolyfill {
    port1: any = { postMessage: () => { } };
    port2: any = { postMessage: () => { } };
}

export default (protocol: string, host: string, path: string, delay: number = 0, port: number) =>
    new Promise<string>((resolve, reject) => {
        const refs = {
            dom: null as any,
            document: null as any
        };

        try {
            refs.dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', {
                url: `${protocol}://${host}:${port}${path}`,
                runScripts: 'dangerously',
                resources: 'usable',
                pretendToBeVisual: true,
                beforeParse(window: any) {
                    window.MessageChannel = MessageChannelPolyfill;
                    window.TextEncoder = TextEncoder;
                    window.TextDecoder = TextDecoder;
                    window.onerror = () => { }; // Suppress error logging
                    window.global = window;
                    window.reactSnapshotRender = () => {
                        try {
                            refs.document = refs.dom.window.document;
                            const html = ensureDoctype(refs.dom.serialize());
                            refs.dom.window.close();
                            resolve(html);
                        } catch (err) {
                            reject(err);
                        }
                    };
                }
            });

            const { criticalCss, mainCss, scriptPath } = buildAssets;
            const style = refs.dom.window.document.createElement('style');
            style.textContent = criticalCss + '\n' + mainCss;
            refs.dom.window.document.head.appendChild(style);

            const script = refs.dom.window.document.createElement('script');
            script.textContent = readFileSync(join(process.cwd(), 'build', scriptPath.replace(/^\//, '')), 'utf8');
            refs.dom.window.document.head.appendChild(script);

            setTimeout(() => {
                if (!refs.document) {
                    try {
                        const documentToReturn = refs.dom.window.document;
                        refs.dom.window.close();
                        resolve(documentToReturn);
                    } catch (err) {
                        reject(err);
                    }
                }
            }, 5000);
        } catch (err) {
            if (refs.dom?.window) {
                refs.dom.window.close();
            }
            reject(err);
        }
    });