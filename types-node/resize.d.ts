declare global {
  interface Size {
    width: number;
    height: number;
    type: string;
  }
  type ResizeJob = {
    original: {
      inputPath: string;
      outputFilePath: string;
      name: string;
      dir: string;
      dirname: string;
      ext: string;
      originalSize: Size;
      relativeInputPath: string;
      originalFileSize: number;
      outputFolder: string;
    };
    userInfo: {
      fileName: string;
      href?: string;
      version?: string | number;
      reference?: string;
      resize?: import("sharp").ResizeOptions;
      placeholder?: boolean;
      copy?: boolean;
      main?: boolean;
      strict?: boolean;
    };
    output: {
      fileName: string;
      folder: string;
      file: string;
      reference: string;
      href: string;
      version: string | number;
      exists: boolean;
      folderExists: boolean;
      copy: boolean;
      shouldOutput: boolean;
      isReplaced: boolean;
      strict: boolean;
      changes: {
        snakecase?: string;
        name?: string;
        ext?: string;
        width?: number;
        height?: number;
      };
    };
  };
  type ResizeTemplateParser = (
    job: ResizeJobInput
  ) => string | number | boolean;

  type ResizeTemplateParsers = {
    [key: string]: ResizeTemplateParser;
  };

  type ResizeJobDone = ResizeJob & {
    resized: {
      width: number;
      height: number;
      aspectRatio: string;
      fileSize: number;
      placeholder?: string;
    };
  };

  type ResizeJobInput = Omit<ResizeJob, "output">;
  type ResizeOriginal = ResizeJob["original"];
  type ResizeUserInfo = ResizeJob["userInfo"];

  type ResizeJobsFn = (original: ResizeOriginal) => ResizeUserInfo[];
  type ResizeImagesProps = {
    inputPath: string;
    outputDir: string;
  };
}

export {};
