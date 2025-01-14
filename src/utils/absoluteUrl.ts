export const absoluteUrl = <P extends string>(
  path: P,
  baseUrl: string,
  publicUrl: string
) => {
  const baseUrlWithPublicUrl = `${baseUrl}${publicUrl}`;
  if (path.startsWith("http")) return path;
  if (path.startsWith(publicUrl)) return `${baseUrl}${path}`;
  return `${baseUrlWithPublicUrl}/${path}` as const;
};
