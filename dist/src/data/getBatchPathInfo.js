export function getBatchPathInfo(pathInfo, batch) {
    const pathname = `/${batch.batchNumber}`;
    return {
        pathname: pathInfo.toLevels,
        to: pathInfo.toLevels + pathname,
        batchNumberParam: String(batch.batchNumber),
    };
}
//# sourceMappingURL=getBatchPathInfo.js.map