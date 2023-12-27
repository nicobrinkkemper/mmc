import path from "node:path";
import { resizeImages } from "./resizeImages.mjs";
import { ImageJsonStructure } from "./resizeJobGroupToData.mjs";
import _ from "lodash";

export async function resizeFolders() {
  try {
    const resizeInfo = await resizeImages();
    if (!resizeInfo) throw new Error("No resizeInfo");
    const entries = Object.entries(resizeInfo);
    if (!entries.length) throw new Error("No resizeInfo");
    const directoryGrouping = [
      ...entries.map(([group, value]) => ({
        [group.split(path.sep)[0] || "resized"]: {
          [group.split(path.sep)[1] || "versions"]: {
            [group.split(path.sep)[2] || "images"]: value,
          },
        },
      })),
    ];
    const resizedFolders = _.merge({}, ...directoryGrouping) as Record<
      string,
      Record<string, Record<string, ImageJsonStructure>>
    >;
    return resizedFolders;
  } catch (e) {
    console.trace(e);
  }
}
