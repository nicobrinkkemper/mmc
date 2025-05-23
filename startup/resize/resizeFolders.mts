import { merge } from "lodash-es";
import path from "node:path";
import { resizeImages } from "./resizeImages.mjs";

export async function resizeFolders(): Promise<ResizeImageStructure> {
  try {
    const resizeInfo = await resizeImages();
    if (!resizeInfo) throw new Error("No resizeInfo");
    const entries = Object.entries(resizeInfo);
    if (!entries.length) throw new Error("No resizeInfo");
    const directoryGrouping = [
      ...entries.map(([group, value]) => {
        const [resized, versions, images] = group.split(path.sep);
        return {
          [resized || "resized"]: {
            [versions || "versions"]: {
              [images || "images"]: value,
            },
          },
        };
      }),
    ];

    return merge({}, ...directoryGrouping) as ResizeImageStructure;
  } catch (e) {
    console.trace(e);
    throw e;
  }
}
