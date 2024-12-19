import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';

const app = express();
const initialPort = parseInt(process.env["PORT"] || "3000");
const basePath = process.env["PUBLIC_URL"] || "";
const buildDir = path.join(process.cwd(), "build");

// Remove basePath from requests before serving
app.use((req, _res, next) => {
  if (basePath && req.url.startsWith(basePath)) {
    req.url = req.url.slice(basePath.length) || "/";
  }
  next();
});

// Serve static files first
app.use(
  "/static",
  express.static(path.join(buildDir, "static"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (filePath.endsWith(".map")) {
        res.setHeader("Content-Type", "application/json");
      }
    },
  })
);

// Handle SPA routing
app.use(historyApiFallback() as express.RequestHandler);

// Serve index.html and other root files
app.use(express.static(buildDir));

const startServer = (port: number) => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .once("listening", () => {
        console.log(
          `Dev server running at http://localhost:${port}${basePath}`
        );
        resolve(server);
      })
      .once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
          console.log(`Port ${port} is busy`);
          reject(err);
        }
      });
  });
};

const tryAlternatePorts = async () => {
  let inUse = [] as number[];
  for (let port = initialPort; port < 3002; port++) {
    try {
      await startServer(port);
      return;
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "EADDRINUSE") {
        inUse.push(port);
      }
    }
  }
  console.error("No available ports found, tried:", inUse.join(", "));
};

tryAlternatePorts();