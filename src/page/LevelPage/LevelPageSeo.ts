export const LevelPageSeo = ({
  level,
  caps,
}: {
  level: Level;
  caps: string;
}) => ({
  description: `${caps} level by ${level.makerName.name}: ${level.levelName.name} - ${level.levelCode}`,
  title: `${level.levelName.name} | ${level.levelCode} | ${caps}`,
  image: level.images.level[580][0],
  twitter: "summary_large_image",
});
