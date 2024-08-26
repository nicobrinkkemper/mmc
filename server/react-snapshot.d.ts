declare class Server {
  constructor(
    baseDir: string,
    publicPath: string,
    port: number,
    proxy: string
  );
  start(): Promise<void>;
  port(): number;
}

declare class Crawler {
  constructor(
    baseUrl: string,
    snapshotDelay: number,
    options: {
      include: string[],
      exclude: string[],
      stripJS: boolean,
    }
  );
  crawl(callback: (args: { urlPath: string, html: string }) => void): Promise<void>;
  snap(): Promise<void>;
  handler: (args: { urlPath: string, html: string }) => void;
  paths: string[];
}

declare function snapshot(
  protocol: string,
  host: string,
  path: string,
  delay: number,
): Promise<Window>;

declare module 'react-snapshot/lib/Server' {
  export = Server;
}

declare module 'react-snapshot/lib/Crawler' {
  export = Crawler;
}

declare module 'react-snapshot/lib/snapshot' {
  export = snapshot;
}