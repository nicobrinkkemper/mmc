import fs from "node:fs";
import { finished } from "node:stream/promises";
import papa from "papaparse";
import { csvFiles } from "./csvFiles.mjs";

export async function csvToJson() {
  for (let { link, name, gid } of csvFiles) {
    try {
      const response = await fetch(`${link}?gid=${gid}&single=true&output=csv`);
      if (!response.ok)
        throw new Error(`unexpected response ${response.statusText}`);
      const to = `./src/data/${name}.json`;

      let writeStream = fs.createWriteStream(to);
      papa.parse(await response.text(), {
        worker: true,
        complete: function (results) {
          writeStream.end(JSON.stringify(results.data));
        },
      });
      await finished(writeStream);
    } catch (e) {
      console.trace(e);
    }
  }
}
