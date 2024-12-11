import bodyParser from "body-parser";
import express from "express";
import { resolve } from "path";
import { createElement } from "react";
import {
  decodeReply,
  renderToPipeableStream,
} from "react-server-dom-esm/server.node";
import { cors, logger } from "./utils.js";

const moduleBaseURL = "/build/";
const port = 3001;

console.log(`Listening on http://localhost:${port}`);

const app = express();

app
  .use(logger)
  .use(cors)
  .get(/.*/, async (req, res) => {
    let mod;
    try {
      mod = (
        await import(resolve("build/app", `.${req.path}/page.js`))
      ).default(req.query);
    } catch {
      mod = "Not Found";
    }
    renderToPipeableStream(mod, moduleBaseURL).pipe(res);
  })
  .post(/.*/, bodyParser.text(), async (req, res) => {
    const actionReference = String(req.headers["rsa-reference"]);
    const actionOrigin = String(req.headers["rsa-origin"]);

    const [filepath, name] = actionReference.split("#");
    const action = (await import(`.${resolve(filepath)}`))[name];

    let args;
    if (req.is("multipart/form-data")) {
      throw new Error("Not implemented");
    } else {
      args = await decodeReply(req.body, moduleBaseURL);
    }

    const returnValue = await action.apply(null, args);
    const root = (
      await import(resolve("build/app", `.${actionOrigin}/page.js`))
    ).default(req.query);
    renderToPipeableStream(
      createElement("root", { returnValue }, root),
      moduleBaseURL
    ).pipe(res);
  })
  .listen(port);
