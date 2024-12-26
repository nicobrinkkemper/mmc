export const LevelPageSeo = <
  P extends `/${T}/level/${B}/${O}`,
  T extends Theme = Theme,
  B extends NumberParam = string,
  O extends NumberParam = string
>({
  level,
  caps,
}: {
  level: ThemeLevel<P>;
  caps: string;
}) => ({
  description: `${caps} level by ${level.makerName.value}: ${level.levelName.value} - ${level.levelCode}`,
  title: `${level.levelName.value} | ${level.levelCode} | ${caps}`,
  image: level.images.level,
  twitter: "summary_large_image",
});
