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
export declare const resizeTemplateParsers: {
    snakecase: ({ original: { name } }: ResizeJobInput) => string;
    name: ({ original: { name } }: ResizeJobInput) => string;
    ext: ({ original: { ext } }: ResizeJobInput) => string;
    width: ({ userInfo: { resize: { width: resizeWidth } }, original: { originalSize: { width }, }, }: ResizeJobInput) => number;
    height: ({ userInfo: { resize: { height: resizeHeight } }, original: { originalSize: { height }, }, }: ResizeJobInput) => number;
};
//# sourceMappingURL=resizeTemplateParsers.d.mts.map