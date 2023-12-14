import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import sizeOf from "image-size";
import _ from "lodash";

const parse = {
  snakecase: ({ original: { name } }) =>
    _.snakeCase(name.replace(/[\W_]+/g, "_").toLowerCase()),
  name: ({ original: { name } }) => String(name),
  ext: ({ original: { ext } }) => String(ext),
  width: ({
    userInfo: {
      resize: { width: resizeWidth },
    },
    original: {
      originalSize: { width },
    },
  }) => Number(resizeWidth || width),
  height: ({
    userInfo: {
      resize: { height: resizeHeight },
    },
    original: {
      originalSize: { height },
    },
  }) => Number(resizeHeight || height),
};

function reduceJobGroupToData(data, job) {
  const {
    output: { reference, placeholder, href, version },
  } = job;
  const hasReference = data && reference in data;
  const fallbackVersion = version || "versions";
  const hasVersion =
    hasReference &&
    typeof data[reference] === "object" &&
    fallbackVersion in data[reference];

  const outputConditional = {
    ...(hasReference && data[reference]),
    ...(placeholder && { placeholder }),
    ...(hasVersion
      ? {
          [fallbackVersion]: [...data[reference][fallbackVersion], href],
        }
      : { [fallbackVersion]: [href] }),
  };
  return {
    ...data,
    [reference]: outputConditional,
  };
}
function jobGroupToData(jobGroup) {
  return jobGroup.reduce(reduceJobGroupToData, {});
}

function addJobOutput(job) {
  if (!job.userInfo.fileName) {
    throw new Error(`no templateName at ${JSON.stringify(job)}`);
  }

  const changes = Object.entries(parse)
    .map(([key, parser]) => {
      const found = job.userInfo.fileName.match(
        new RegExp(`\\[${key}\\]`, "g")
      );
      if (!found) return undefined;
      if (!job.original.name)
        throw new Error(`no match for ${key} at ${job.userInfo.fileName}`);
      const value = parser(job);
      if (!value) {
        throw new Error(`no value for ${key} at ${job.userInfo.fileName}`);
      }
      return [key, value];
    })
    .filter(Boolean);

  if (!changes) {
    throw new Error(`no changes at ${job.userInfo.fileName}`);
  }

  const outputFileName = changes.reduce(
    (acc, [key, value]) => acc.replace(`[${key}]`, value),
    job.userInfo.fileName
  );

  const file = path.join(job.original.outputFolder, outputFileName);

  const href =
    (job.userInfo.href || "") +
    path.join(
      file.replace("public/", "").replace("src/", "").replace("assets/", "")
    );

  const version = job.userInfo.version
    ? job.userInfo.version
    : changes.reduce((acc, change) => {
        const [key, value] = change;
        if (acc !== "") acc += "_";
        if (key === "width" || key === "height") acc += value;
        return acc;
      }, "");

  const reference = job.userInfo.reference
    ? job.userInfo.reference
    : parse.snakecase(job);

  return {
    ...job,
    output: {
      fileName: outputFileName,
      folder: job.original.outputFolder,
      file,
      reference,
      href,
      version,
      changes: Object.fromEntries(changes),
    },
  };
}

async function stat(job, type = "file") {
  const { file, folder } = job.output;
  return !!(await fs.stat(type === "file" ? file : folder).catch(() => false));
}

async function createFolder(job) {
  if (!job?.output) {
    console.log("no job", job);
    return;
  }
  const {
    output: { folder },
  } = job;
  const outputDirExists = await stat(job, "folder");
  if (outputDirExists) return;
  await fs.mkdir(folder, {
    recursive: true,
  });
}

function createPlaceholderResize(job) {
  const {
    userInfo: { resize },
    original: { originalSize },
  } = job;
  const placeholderResize = {
    width: 6,
    height: 6,
  };
  for (let key in ["width", "height"])
    placeholderResize[key] = Math.ceil(
      (key in resize ? resize[key] : originalSize[key]) / 64
    );
  return placeholderResize;
}
// create empty json file and create folders
async function writeJson(data, outputPath) {
  const { dir: outputDir } = path.parse(outputPath);
  try {
    await createFolder({
      output: { folder: outputDir },
    });
    await fs.writeFile(outputPath, JSON.stringify(data));
  } catch (error) {
    console.trace(error);
    throw new Error(`writing json: ${error.message} `);
  }
}

export async function resizeImages(props) {
  const { outputDirData = "./resize-data" } = props;
  const jobs = mapPropsToJobs(props);
  const groupedJobs = _.groupBy(jobs, (job) => job.original.dir);
  try {
    for (const [group, jobGroup] of Object.entries(groupedJobs)) {
      for (const job of jobGroup) {
        const { name, ext } = path.parse(job.output.file);
        await createFolder(job);
        const outputFile = path.join(job.output.folder, name + ext);
        const exists = await stat(job, "file");
        if (!exists && job.userInfo.copy) {
          console.log("Copying file", job.output.file);
          await fs.copyFile(job.original.inputPath, outputFile);
          continue;
        }

        const imageBuffer = await fs.readFile(job.original.inputPath);

        const instance = await sharp(imageBuffer);
        if (job.original.ext === ".webp") await instance.webp();
        if (!exists && job.userInfo.resize) {
          console.log("Resizing file", job.output.file);
          await instance.resize(job.userInfo.resize);
          await instance.toFile(job.output.file);
        }
        if (!job.output.reference) continue;
        if (!job.userInfo.placeholder) continue;
        const buffer = await instance.resize(createPlaceholderResize(job));
        const placeholder = await buffer.toBuffer();
        job.output.placeholder = placeholder.toString("base64");
        // END OF LOOP
      }
      const data = jobGroupToData(jobGroup);
      await writeJson(data, path.join(outputDirData, group, "images.json"));
    }
  } catch (error) {
    console.trace(error);
    throw new Error(`resizing images: ${error.message} `);
  }
}

function mapPropsToJobs(props) {
  return props.images.flatMap((outputFilePath) =>
    createJobs(outputFilePath, props)
  );
}

function createJobs(outputFilePath, props) {
  let { dir, name, ext } = path.parse(outputFilePath);
  const inputPath = path.join(props.inputPath, outputFilePath);
  const dirname = path.basename(dir);
  const filenameWithoutExt = name;
  const originalSize = sizeOf(inputPath);
  const relativeInputPath = path.relative(props.inputPath, inputPath);
  let outputFolder = path.join(props.outputDir, dir);

  const original = {
    inputPath,
    outputFilePath,
    name,
    dir,
    dirname,
    filenameWithoutExt,
    ext,
    originalSize,
    relativeInputPath,
    outputFolder,
  };

  const userInfos = props.getInfo(original);
  if (!Array.isArray(userInfos)) {
    throw new Error(`getInfo must return an array of jobs`);
  }

  return userInfos.map((userInfo) => {
    if (!userInfo.fileName) {
      throw new Error(`no fileName at ${JSON.stringify(userInfo)}`);
    }
    return addJobOutput({
      userInfo,
      original,
    });
  });
}
