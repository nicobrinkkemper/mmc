import type { OutputInfo, ResizeOptions } from "sharp";
interface Size {
  width: number;
  height: number;
  type: string;
}
interface SizeCalculationResult extends Size {
  images: Size[];
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
    originalSize: SizeCalculationResult;
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
    main?: boolean;
  };
  output: {
    fileName: string;
    folder: string;
    file: string;
    reference: string;
    href: string;
    version: string | number;
    exists?: boolean;
    sharpOutputInfo?: OutputInfo;
    copy?: string;
    shouldOutput?: boolean;
    isReplaced?: boolean;
    strict?: boolean;
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
  resizeJobs: ResizeGetInfoFn;
  images?: string[];
};

export type ResizeTemplateParser = (
  job: ResizeJobInput
) => string | number | boolean;
