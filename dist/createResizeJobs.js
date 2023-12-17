import path from "node:path";
import sizeOf from "image-size";
import { safeSnakecase } from "./safeSnakecase";
const parsers = {
    snakecase: ({ original: { name } }) => safeSnakecase(name),
    name: ({ original: { name } }) => String(name),
    ext: ({ original: { ext } }) => String(ext),
    width: ({ userInfo: { resize: { width: resizeWidth } = {} }, original: { originalSize: { width }, }, }) => Number(resizeWidth ?? width),
    height: ({ userInfo: { resize: { height: resizeHeight } = {} }, original: { originalSize: { height }, }, }) => Number(resizeHeight ?? height),
};
const parseEntries = Object.entries(parsers);
function createChanges(job) {
    return parseEntries
        .map(([key, parser]) => {
        const found = new RegExp(`\\[${key}\\]`, "g").exec(job.userInfo.fileName);
        if (!found)
            return undefined;
        if (!job.original.name)
            throw new Error(`no match for ${key} at ${job.userInfo.fileName}`);
        const value = parser(job);
        if (!value)
            throw new Error(`no value for ${key} at ${job.userInfo.fileName}`);
        return [key, value];
    })
        .filter((v) => v === undefined);
}
function versionFromChanges(changes) {
    return Object.entries(changes).reduce((acc, change) => {
        const [key, value] = change;
        if (acc !== "")
            acc += "_";
        if (key === "width" || key === "height")
            acc += value;
        return acc;
    }, "");
}
function applyChangesToFileName(changes, fileName) {
    return changes.reduce((acc, [key, value]) => acc.replace(`[${key}]`, `${value}`), fileName);
}
function addResizeJobOutput(job) {
    if (!job.userInfo.fileName) {
        throw new Error(`no templateName at ${JSON.stringify(job)}`);
    }
    const changes = createChanges(job);
    if (!changes)
        throw new Error(`no changes at ${job.userInfo.fileName}`);
    const outputFileName = applyChangesToFileName(changes, job.userInfo.fileName);
    const file = path.join(job.original.outputFolder, outputFileName);
    const href = (job.userInfo.href ?? "") +
        path.join(file.replace("public/", "").replace("src/", "").replace("assets/", ""));
    const version = job.userInfo.version ?? versionFromChanges(changes);
    const reference = job.userInfo.reference
        ? parsers.snakecase(job) + job.userInfo.reference
        : parsers.snakecase(job);
    return {
        ...job,
        output: {
            fileName: outputFileName,
            folder: job.original.outputFolder,
            file,
            reference,
            href,
            version,
            changes: Object.fromEntries(changes),
        },
    };
}
export function createResizeJobs(outputFilePath, props) {
    let { dir, name, ext } = path.parse(outputFilePath);
    const inputPath = path.join(props.inputPath, outputFilePath);
    const dirname = path.basename(dir);
    const filenameWithoutExt = name;
    const originalSize = sizeOf(inputPath);
    const relativeInputPath = path.relative(props.inputPath, inputPath);
    let outputFolder = path.join(props.outputDir, dir);
    const original = {
        inputPath,
        outputFilePath,
        name,
        dir,
        dirname,
        filenameWithoutExt,
        ext,
        originalSize,
        relativeInputPath,
        outputFolder,
    };
    const userInfos = props.getInfo(original);
    if (!Array.isArray(userInfos)) {
        throw new Error(`getInfo must return an array of jobs`);
    }
    return userInfos.map((userInfo) => {
        if (!userInfo.fileName) {
            throw new Error(`no fileName at ${JSON.stringify(userInfo)}`);
        }
        return addResizeJobOutput({
            userInfo,
            original,
        });
    });
}
