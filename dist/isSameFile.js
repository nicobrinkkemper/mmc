// a function that compares two files using Buffer.compare()
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
export async function isSameFile(file1, file2) {
    const [stat1, stat2] = await Promise.all([fs.stat(file1), fs.stat(file2)]);
    if (stat1.size !== stat2.size)
        return false;
    return Promise.all([fs.readFile(file1), fs.readFile(file2)]).then(([buf1, buf2]) => Buffer.compare(buf1, buf2) === 0);
}
