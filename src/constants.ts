export const SNAP = navigator.userAgent !== "ReactSnap"
export const PRODUCTION = process.env.NODE_ENV === "production" && SNAP
export const BASE_URL = 'https://mmcelebration.com';
export const DEFAULT_DESCRIPTION = 'Yearly Mario Maker Celebrations\' Official Site'
export const DEFAULT_TITLE = '7MMC'
export const PICTURE_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+PXr138ACc4D7jLQ4dsAAAAASUVORK5CYII='