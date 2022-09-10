import path from 'node:path';
import sharp from 'sharp';
import sizeOf from 'image-size'
const [
  inputArg,
  width = 1024
] = process.argv.slice(2);
const input = path.parse(inputArg);
const newBaseName = input.name.replace('original_', '');
const newPath = input.dir + '/' + newBaseName;
const { width: originalWidth } = sizeOf(inputArg)

const getWidth = (divider) => Math.min(originalWidth, Math.round(width / divider))

await Promise.all(
  [1, 2, 3].map((n) => {
    console.info(`resizing ${newBaseName} from ${originalWidth} to ${getWidth(n)}`)
    return sharp(inputArg)
      .webp()
      .resize({ width: getWidth(n) })
      .toFile(`${newPath}${n}x.webp`)
  })
);