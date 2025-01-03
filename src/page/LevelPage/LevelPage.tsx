import { Layout } from "../../layout/Layout";
import { useLevel } from "../../theme/useLevel";
import { useTheme } from "../../theme/useTheme";
import { Level } from "./Level";

export function LevelPage() {
  const {
    info: { caps },
  } = useTheme();
  const { level } = useLevel();
  return (
    <Layout
      small
      type="simple"
      seo={{
        description: `${caps} level by ${level.makerName.name}: ${level.levelName.name} - ${level.levelCode}`,
        title: `${level.levelName.name} | ${level.levelCode} | ${caps}`,
        image: level.images.level[580][0],
        twitter: "summary_large_image",
      }}
    >
      <Level />
    </Layout>
  );
}
