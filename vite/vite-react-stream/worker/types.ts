export interface RenderState {
  chunks: string[];
  buffers: ArrayBuffer[];
  complete: boolean;
  rendered: boolean;
  outDir: string;
  moduleBasePath: string;
  moduleBaseURL: string;
  htmlOutputPath: string;
  id: string;
}

export interface WorkerRscChunkMessage {
  type: "RSC_CHUNK";
  id: string;
  chunk: string;
  buffer: ArrayBuffer;
  moduleBasePath: string;
  moduleBaseURL: string;
  outDir: string;
  htmlOutputPath: string;
}

export interface WorkerRscEndMessage {
  type: "RSC_END";
  id: string;
}

export interface WorkerShutdownMessage {
  type: "SHUTDOWN";
}

export type WorkerMessage =
  | WorkerRscChunkMessage
  | WorkerRscEndMessage
  | WorkerShutdownMessage;
