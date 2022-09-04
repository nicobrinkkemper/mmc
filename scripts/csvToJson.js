"use strict";
/**
 * In order to use csv better, we transform it to JSON. This should be supported more out of the box than CSV.
 */
const fs = require("fs");
const papa = require("papaparse");
const from = "./src/data/5YMM Master Spreadsheet - Sheet1.csv";
const to = "./src/data/5YMM Master Spreadsheet - Sheet1.json";

const file = fs.createReadStream(__dirname + "/." + from); // use relative path
let writeStream = fs.createWriteStream(__dirname + "/." + to); // use relative path
writeStream
  .on("error", function (err) {
    console.trace(err);
  });
papa.parse(file, {
  worker: true, // Don't bog down the main thread if its a big file
  complete: function (results) {
    writeStream.end(JSON.stringify(results.data));
  },
});
