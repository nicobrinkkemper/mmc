import fs from "node:fs/promise";
import stream from "node:stream";
import util from "node:util";
const streamPipeline = util.promisify(stream.pipeline);

async function download(url, path) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);
  await streamPipeline(response.body, fs.createWriteStream(path));
}
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
    await download(
      `${link}?gid=${gid}&single=true&output=csv`,
      `./scripts/data/${name}.csv`
    );
  } catch (e) {
    console.log(`couldnt sync ${name}.csv`, e.message);
  }
}
