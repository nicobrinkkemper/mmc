import type { OutputInfo, ResizeOptions } from "sharp";
export interface ISize {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
}
export interface ISizeCalculationResult extends ISize {
  images?: ISize[];
}
export type ResizeJob = {
  original: {
    inputPath: string;
    outputFilePath: string;
    name: string;
    dir: string;
    dirname: string;
    filenameWithoutExt: string;
    ext: string;
    originalSize: ISizeCalculationResult;
    relativeInputPath: string;
    outputFolder: string;
  };
  userInfo: {
    fileName: string;
    href?: string;
    version?: string | number;
    reference?: string;
    resize?: ResizeOptions;
    placeholder?: boolean;
    copy?: boolean;
  };
  output: {
    fileName: string;
    folder: string;
    file: string;
    reference: string;
    href: string;
    version: string | number;
    exists?: boolean;
    sharpOutputInfo?: OutputInfo | undefined;
    copy?: string | undefined;
    shouldOutput?: boolean;
    isReplaced?: boolean;
    changes: {
      snakecase?: string;
      name?: string;
      ext?: string;
      width?: number;
      height?: number;
    };
    placeholder?: string;
  };
};

export type ResizeJobInput = Omit<ResizeJob, "output">;
export type ResizeOriginal = ResizeJob["original"];
export type ResizeUserInfo = ResizeJob["userInfo"];

export type ResizeGetInfoFn = (original: ResizeOriginal) => ResizeUserInfo[];
export type ResizeImagesProps = {
  inputPath: string;
  outputDir: string;
  outputDirData?: string;
  getInfo: ResizeGetInfoFn;
  images: string[];
};
