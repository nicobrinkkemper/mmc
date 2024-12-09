import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';

const app = express();
const initialPort = parseInt(process.env.PORT || '3000');
const basePath = process.env.PUBLIC_URL || '';
const buildDir = path.join(process.cwd(), 'build');

// Remove basePath from requests before serving
app.use((req, res, next) => {
    if (basePath && req.url.startsWith(basePath)) {
        req.url = req.url.slice(basePath.length) || '/';
    }
    next();
});

// Handle SPA routing first
app.use(historyApiFallback({
    index: '/index.html',
    rewrites: [{
        from: new RegExp(`^${basePath}/?.*`),
        to: '/index.html'
    }]
}));

// Then serve static files with explicit MIME types
app.use('/static', express.static(path.join(buildDir, 'static'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.map')) {
            res.setHeader('Content-Type', 'application/json');
        }
    }
}));

const startServer = (port: number) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .once('listening', () => {
                console.log(`Dev server running at http://localhost:${port}${basePath}`);
                resolve(server);
            })
            .once('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`Port ${port} is busy`);
                    reject(err);
                }
            });
    });
};

const tryAlternatePorts = async () => {
    let inUse = [initialPort];
    for (let port = initialPort; port < 3002; port++) {
        try {
            console.log(`Ports in use: ${inUse.join(', ')} so we are trying ${port}`);
            await startServer(port);
            return;
        } catch (err) {
            if (err.code === 'EADDRINUSE') {
                inUse.push(port);
            }
        }
    }
};

tryAlternatePorts();