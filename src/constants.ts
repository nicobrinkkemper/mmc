export const SNAP = navigator.userAgent !== "ReactSnap"
export const DEFAULT_DESCRIPTION = 'Yearly Mario Maker Celebrations\' Official Site'
export const BASE_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';
export const ABSOLUTE_BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : process.env.REACT_APP_BASE_URL ?? 'https://mmcelebration.com';
