import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";
const streamPipeline = util.promisify(stream.pipeline)

async function download(url, path) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream(path))
}

const fileId = '1YI31ZSCbZlCCi070pl_oeDV6hBLfFxgw';
await download(`https://doc-48-c4-drive-data-export.googleusercontent.com/download/91ahvl9ms9c6bj43cleleaclb6ak1d0r/1ns4un8i4113iaoao6l694gv0ruh3e91/1662813000000/40b4e6b8-092f-462e-8189-30a6cb1f0e8c/117302701302699908909/ADt3v-Nk1YSJLTgy3oE1vVXitNEl7R0lMBcFCSAEYS7LcaKySns6xIvnSyh9eLjot4ZluBAkSNxd3C0eAHB2v91PYw3cwPtKrU42TKUYiXRorSfu9ObZCitgkN2a7z4SzhIW9mlvWcP-Ol7gZRZMuFdSM4ZBmcFzscKuyZbiC0nr-F2DI88cxwbimZaGG0lWYPymV8D6HwmMvkHdtPxdihuA3eF41LtMIFCPOMMwuAZHrWMKCKZdo92yeawFh-Sh_8BrryRfu81mtQqecfaaVk7ldmc5rdbWPPhxXcL7fbGjI1zs1aROdbAz_nkkSkOxYWjj46HRJRb-`, './src/data/miis.zip');
