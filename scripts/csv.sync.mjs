import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";
const streamPipeline = util.promisify(stream.pipeline)

async function download(url, path) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream(path))
}

const fileId = '1Wl1weG7sKzqAXAz4J98b1al1hy3IWtgO8O4w6ZGHsi0';
await download(`https://docs.google.com/feeds/download/spreadsheets/Export?key=${fileId}&exportFormat=csv&gid=0`, './src/data/MasterSpreadsheet.csv');
