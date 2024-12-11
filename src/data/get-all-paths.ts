import themes from './themes.json' with { type: 'json' };
import themeKeys from './themesKeys.json' with { type: 'json' };

type Batch = (typeof themes)[keyof typeof themes]["batches"][number];
type Level = Batch["levels"][number];

/**
 * Retrieves all paths for the application.
 * IMPORTANT: All paths must be relative (no leading slashes) to work with the static site generator.
 * Each path represents a directory that will contain an index.html file.
 * @returns A promise that resolves to an array of relative paths.
 */
export async function getAllPaths(): Promise<string[]> {
  const paths: string[] = [""];

  themeKeys.forEach((key: string) => {
    const theme = themes[key as keyof typeof themes];
    paths.push(key);
    paths.push(`${key}/levels`);
    paths.push(`${key}/credits`);

    theme.batches?.forEach((batch: Batch) => {
      batch.levels?.forEach((level: Level) => {
        paths.push(`${key}/level/${batch.batchNumber}/${level.order}`);
      });
    });
  });

  return paths;
}
