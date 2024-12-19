import path from "node:path";
import { resizeConfig } from "../resizeConfig.mjs";
import { resizeJobs } from "../resizeJobs.mjs";
import { createResizeJobOutput } from "./createResizeJobOutput.mjs";
import { sizeOf } from "./sizeOf.mjs";
/**
 * Creates a unique job for each version of an image.
 * We create the object containing information about the original image, pass it to "userInfo" from the config
 * and then create the output for each job using `createResizeJobOutput
 *
 * @param inputFile - The file to resize
 * @returns An array of jobs
 */
export function createResizeJobs(inputFile) {
    const outputFilePath = inputFile.path;
    const { dir, name, ext } = path.parse(outputFilePath);
    const inputPath = path.join(resizeConfig.inputPath, outputFilePath);
    const dirname = path.basename(dir);
    const originalSize = sizeOf(inputPath);
    const relativeInputPath = path.relative(resizeConfig.inputPath, inputPath);
    const outputFolder = path.join(resizeConfig.outputDir, dir);
    const original = {
        inputPath,
        outputFilePath,
        name, // file name without extension
        dir,
        dirname,
        ext,
        originalSize,
        originalFileSize: inputFile.size,
        relativeInputPath,
        outputFolder,
    };
    const userInfos = resizeJobs(original);
    if (!Array.isArray(userInfos)) {
        throw new Error(`resizeJobs must return an array of jobs`);
    }
    return userInfos.map(async (userInfo) => {
        if (!userInfo.fileName)
            throw new Error(`no fileName at ${JSON.stringify(userInfo)}`);
        const output = await createResizeJobOutput({
            userInfo,
            original,
        });
        return {
            original,
            output,
            userInfo,
        };
    });
}
//# sourceMappingURL=createResizeJobs.mjs.map