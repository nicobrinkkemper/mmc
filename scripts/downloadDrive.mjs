import { google } from "googleapis";
import fs from "fs";
import os from "os";
import uuid from "uuid";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { oauthkey } from "./.oauthkey.json";

const drive = google.drive('v3');

async function runSample(fileId) {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata', 'https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.photos.readonly', 'https://www.googleapis.com/auth/drive.readonly']
  });
  google.options({
    auth
  }); // For converting document formats, and for downloading template
  // documents, see the method drive.files.export():
  // https://developers.google.com/drive/api/v3/manage-downloads

  return drive.files.get({
    fileId,
    alt: 'media'
  }, {
    responseType: 'stream'
  }).then(res => {
    return new Promise((resolve, reject) => {
      const filePath = path.join(os.tmpdir(), uuid.v4());
      console.log(`writing to ${filePath}`);
      const dest = fs.createWriteStream(filePath);
      let progress = 0;
      res.data.on('end', () => {
        console.log('Done downloading file.');
        resolve(filePath);
      }).on('error', err => {
        console.error('Error downloading file.');
        reject(err);
      }).on('data', d => {
        progress += d.length;

        if (process.stdout.isTTY) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`Downloaded ${progress} bytes`);
        }
      }).pipe(dest);
    });
  });
}

if (module === require.main) {
  if (process.argv.length !== 3) {
    throw new Error('Usage: node samples/drive/download.js $FILE_ID');
  }

  const fileId = process.argv[2];
  runSample(fileId).catch(console.error);
}

export default runSample;