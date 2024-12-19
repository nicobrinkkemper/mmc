import path from "node:path";
import { createSharpInstance } from "./createSharpInstance.mjs";
import { ratio } from "./ratio.mjs";
import { toPlaceholderBase64 } from "./toPlaceholderBase64.mjs";
export async function outputResizedImage(job) {
    if (job.output.shouldOutput === false)
        throw new Error("should not output");
    const instance = await createSharpInstance(job.original.inputPath);
    if (!job.userInfo.resize) {
        console.info("skipping", job.output.file);
        return;
    }
    if (path.parse(job.output.file).ext === ".webp")
        instance.webp();
    instance.resize(job.userInfo.resize);
    const placeholder = await toPlaceholderBase64(job, instance);
    const file = await instance.toFile(job.output.file).catch((e) => {
        console.trace(e);
        return undefined;
    });
    if (!file)
        throw new Error("file is undefined");
    return {
        width: file.width,
        height: file.height,
        aspectRatio: ratio(file.width, file.height),
        fileSize: file.size,
        ...(placeholder ? { placeholder } : {}),
    };
}
//# sourceMappingURL=outputResizedImage.mjs.map