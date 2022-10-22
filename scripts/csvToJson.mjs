import fs from "node:fs";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import papa from "papaparse";
const __dirname = dirname(fileURLToPath(import.meta.url));


const from = "./src/data/MasterSpreadsheet.csv";
const to = "./src/data/MasterSpreadsheet.json";

const file = fs.createReadStream(__dirname + "/." + from); // use relative path
let writeStream = fs.createWriteStream(__dirname + "/." + to); // use relative path
writeStream
  .on("error", function (err) {
    console.trace(err);
  });
papa.parse(file, {
  worker: true, // Don't bog down the main thread if its a big file
  complete: function (results) {
    writeStream.end(JSON
      .stringify(results.data)
      // remove some junk at the end of the file
    );
  },
});
