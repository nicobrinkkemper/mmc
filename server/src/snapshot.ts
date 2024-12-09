/* Wraps a jsdom call and returns the full page */
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { TextDecoder, TextEncoder } from 'util';

class MessageChannelPolyfill {
    port1: any = { postMessage: () => { } };
    port2: any = { postMessage: () => { } };
}

// Cache content from index.html
const { criticalCss, mainCss, scriptPath, cssPath } = (() => {
    const indexHtml = readFileSync(join(process.cwd(), 'build', 'index.html'), 'utf8');

    // Extract all CSS content
    const mainCssPath = indexHtml.match(/href="(\/static\/css\/main\.[^"]+\.css)"/)?.[1] || '';
    const mainCssContent = readFileSync(join(process.cwd(), 'build', mainCssPath), 'utf8');

    // Get critical and main CSS
    const criticalStyle = indexHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] || '';
    const scriptPath = indexHtml.match(/src="(\/static\/js\/main\.[^"]+)"/)?.[1] || '';

    return {
        criticalCss: criticalStyle,
        mainCss: mainCssContent,
        scriptPath,
        cssPath: mainCssPath
    };
})();

export default (protocol: string, host: string, path: string, delay: number, port: number) =>
    new Promise((resolve, reject) => {
        const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>', {
            url: `${protocol}//${host}:${port}${path}`,
            runScripts: 'dangerously',
            resources: 'usable',
            pretendToBeVisual: true,
            beforeParse(window: any) {
                window.MessageChannel = MessageChannelPolyfill;
                window.TextEncoder = TextEncoder;
                window.TextDecoder = TextDecoder;
                window.reactSnapshotRender = () => {
                    // Wait for React to finish hydrating
                    if (window.document.querySelector('#root')?.children.length) {
                        resolve(window);
                    }
                };
            }
        });

        // Inline all CSS immediately
        const style = dom.window.document.createElement('style');
        style.textContent = criticalCss + '\n' + mainCss;  // Combine critical and main CSS
        dom.window.document.head.appendChild(style);

        // Add deferred script
        const script = dom.window.document.createElement('script');
        script.src = scriptPath;
        script.defer = true;
        dom.window.document.head.appendChild(script);

        setTimeout(() => reject(new Error("Render timeout")), delay);
    });