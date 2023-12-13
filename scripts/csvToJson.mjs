import fs from "node:fs";
import { dirname } from "node:path";
import { finished } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import papa from "papaparse";

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = [
  // archived version
  {
    name: "7mmc",
    link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub",
    gid: "0",
  },
  // archive version 8mmc
  {
    name: "8mmc",
    link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vROk4rxqS9jPImRfwqL6T6pFHJSBs4Gx3O9JUzabTeDA0aZrr2xccinxeuWhSNJJflByzbE63CAkZj0/pub",
    gid: "1776023134",
  },
  // live spreadsheet
  // {
  //   name: "8mmc",
  //   link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5wzWffhK_Sz7DZ1XY7rzJCi5TrWVvIkcF1M6UCM_b3ZR8wY-JT0m25gf9IeYyJehe12O0QmMGQVuR/pub",
  //   gid: "0",
  // },
];

for (let { link, name, gid } of files) {
  try {
    const response = await fetch(`${link}?gid=${gid}&single=true&output=csv`);
    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);
    const to = `./src/data/${name}.json`;

    let writeStream = fs.createWriteStream(__dirname + "/." + to);
    papa.parse(await response.text(), {
      worker: true,
      complete: function (results) {
        writeStream.end(JSON.stringify(results.data));
      },
    });

    await finished(writeStream);
  } catch (e) {
    console.trace(e);
    console.log(`couldnt sync ${name}.csv`, e.message);
  }
}
