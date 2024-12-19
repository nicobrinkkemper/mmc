export function getLevelPathInfo(pathInfo, level) {
    const pathname = `/level/${level.batchNumber}/${level.order}`;
    return {
        pathname,
        to: pathInfo.themeSlug + pathname,
        orderParam: String(level.order),
        batchNumberParam: String(level.batchNumber),
    };
}
//# sourceMappingURL=getLevelPathInfo.js.map