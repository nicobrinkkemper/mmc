/**
 * Creates a unique job for each version of an image.
 * We create the object containing information about the original image, pass it to "userInfo" from the config
 * and then create the output for each job using `createResizeJobOutput
 *
 * @param inputFile - The file to resize
 * @returns An array of jobs
 */
export declare function createResizeJobs(inputFile: FileReference): Promise<ResizeJob>[];
//# sourceMappingURL=createResizeJobs.d.mts.map