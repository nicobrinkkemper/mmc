import path from 'node:path';
import sharp from 'sharp';
import sizeOf from 'image-size'
const [
  inputArg,
  width = 1024
] = process.argv.slice(2);
const input = path.parse(inputArg);
const { width: originalWidth } = sizeOf(inputArg)

const getWidth = (divider) => Math.min(originalWidth, Math.round(width / divider))
console.info(`resizing image from ${originalWidth} to ${getWidth(1)}, ${getWidth(2)}, ${getWidth(3)}`)

await Promise.all([
  sharp(inputArg)
    .webp()
    .resize({ width: getWidth(1) })
    .toFile(input.dir + '/' + input.name.replace('original_', '') + '1x.webp'),
  sharp(inputArg)
    .webp()
    .resize({ width: getWidth(2) })
    .toFile(input.dir + '/' + input.name.replace('original_', '') + '2x.webp'),
  sharp(inputArg)
    .webp()
    .resize({ width: getWidth(3) })
    .toFile(input.dir + '/' + input.name.replace('original_', '') + '3x.webp')
]);