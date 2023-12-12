import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import papa from "papaparse";
const __dirname = dirname(fileURLToPath(import.meta.url));

const files = ["7mmc", "8mmc"];

for (let fileName of files) {
  const from = `./scripts/data/${fileName}.csv`;
  const to = `./src/data/${fileName}.json`;

  const file = fs.createReadStream(__dirname + "/." + from);
  let writeStream = fs.createWriteStream(__dirname + "/." + to);
  writeStream.on("error", function (err) {
    console.trace(err);
  });
  papa.parse(file, {
    worker: true,
    complete: function (results) {
      writeStream.end(JSON.stringify(results.data));
    },
  });
}
