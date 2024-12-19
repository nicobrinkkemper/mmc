declare global {
  interface WelcomeParams {
    theme: Theme;
  }

  interface LevelBatchesParams {
    theme: Theme;
  }

  interface LevelBatchParams {
    theme: Theme;
    batchNumber: string;
  }

  interface LevelParams {
    theme: Theme;
    batchNumber: string;
    order: string;
  }

  interface CreditsParams {
    theme: Theme;
  }

  interface NotFoundParams {
    theme: Theme;
    error?: Error;
  }
}

export {};
