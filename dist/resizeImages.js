import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import { fileStat } from "./stat";
import _ from "lodash";
import { createFolder } from "./createFolder";
import { jobGroupToData } from "./resizeJobGroupToData";
import { writeJson } from "./writeJson";
import { createResizeJobs } from "./createResizeJobs";
import { isSameFile } from "./isSameFile";
function divideResizeBy(resize, by) {
    for (let key of ["width", "height"])
        if (key in resize)
            resize[key] = Math.ceil(Number(resize[key]) / by);
    return resize;
}
async function outputPlaceholder(job, instance) {
    if (!(job.output.reference && job.userInfo.placeholder && job.userInfo.resize))
        return;
    const buffer = await instance
        .resize(divideResizeBy(job.userInfo.resize, 32))
        .toBuffer()
        .catch((e) => {
        console.trace(e);
        return undefined;
    });
    if (!buffer)
        return undefined;
    return buffer.toString("base64");
}
async function outputResizedImage(job, instance) {
    if (!job.userInfo.resize)
        return;
    if (job.original.ext === ".webp")
        instance.webp();
    return instance
        .resize(job.userInfo.resize)
        .toFile(job.output.file)
        .catch((e) => {
        console.trace(e);
        return undefined;
    });
}
async function outputCopyImage(job) {
    if (!job.userInfo.copy)
        return;
    const { name, ext } = path.parse(job.output.file);
    const outputFile = path.join(job.output.folder, name + ext);
    await fs.copyFile(job.original.inputPath, outputFile).catch(console.trace);
    return outputFile;
}
async function shouldOutputImage(job) {
    if (!job.output.exists)
        return true;
    return !(await isSameFile(job.original.inputPath, job.output.file).catch((e) => {
        console.trace(e);
        return true;
    }));
}
async function createSharpInstance(job) {
    const imageBuffer = await fs
        .readFile(job.original.inputPath)
        .catch((e) => console.trace(e));
    if (Buffer.isBuffer(imageBuffer))
        return sharp(imageBuffer);
}
const mapImagesToResizeJobs = (props) => props.images.flatMap((path) => createResizeJobs(path, props));
const mapPropsToResizeJobs = (props) => Object.entries(_.groupBy(mapImagesToResizeJobs(props), (job) => job.original.dir));
export async function resizeImages(props) {
    const { outputDirData = "./resize-data" } = props;
    try {
        for (const [group, jobGroup] of mapPropsToResizeJobs(props)) {
            for (const job of jobGroup) {
                await createFolder(job.output.folder);
                job.output.exists = await fileStat(job.output.file);
                job.output.shouldOutput = await shouldOutputImage(job);
                if (!job.output.shouldOutput)
                    continue;
                job.output.isReplaced = job.output.exists && job.output.shouldOutput;
                job.output.copy = await outputCopyImage(job);
                const instance = await createSharpInstance(job);
                if (instance === undefined)
                    continue;
                job.output.sharpOutputInfo = await outputResizedImage(job, instance);
                job.output.placeholder = await outputPlaceholder(job, instance);
                console.log(job.output);
            }
            const data = jobGroupToData(jobGroup);
            await writeJson(data, path.join(outputDirData, group, "images.json"));
        }
    }
    catch (e) {
        console.trace(e);
    }
}
