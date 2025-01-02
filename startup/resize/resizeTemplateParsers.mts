import { safeSnakecase } from "../../src/utils/safeSnakecase.js";

/**
 * Basically a list of all the things you can put in the template name. It gets
 * the whole job object, which is everything the program knows about the image,
 * the parser is responsible for returning the correct value.
 *
 * @example ```ts
 * fileName: '[snakecase]-[width].webp'
 * // becomes
 * fileName: 'my_image-100.webp'
 * ```
 */
export const resizeTemplateParsers = {
  snakecase: ({ original: { name } }) => safeSnakecase(name),
  name: ({ original: { name } }) => String(name),
  ext: ({ original: { ext } }) => String(ext),
  width: ({
    userInfo: { resize: { width: resizeWidth } = {} },
    original: {
      originalSize: { width },
    },
  }) => Number(resizeWidth ?? width),
  height: ({
    userInfo: { resize: { height: resizeHeight } = {} },
    original: {
      originalSize: { height },
    },
  }) => Number(resizeHeight ?? height),
} satisfies ResizeTemplateParsers;
