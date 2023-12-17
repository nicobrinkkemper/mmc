import { PropsWithChildren, useMemo } from "react";
import { LevelContext } from "./LevelContext";
import { useTheme } from "../theme/useTheme";
import { TransformName } from "../TransformName";
import { useLevelFromParams } from "./useLevelFromParams";
import { Theme } from "../theme/ThemeContext";
import { getLevelImage, getLevelThumbnail } from "../data/getLevelImage";

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never





export function LevelProvider({ children }: Readonly<PropsWithChildren>) {

    const level = useLevelFromParams();
    const { theme } = useTheme();
    const levelInfo = useMemo(() => {
        const transformedLevelName = TransformName(level.data.levelName)
        const transformedMakerName = TransformName(level.data.makerName)
        const levelImage = getLevelThumbnail(theme, transformedLevelName);
        const thumbnailImage = themeLevelsImages[`${transformedLevelName}_thumbnail`];
        const makerImage = themeMakerImages[transformedMakerName];

        if (!makerImage) console.log("Not found", transformedMakerName, makerImage)
        if (!thumbnailImage) console.log("Not found", transformedLevelName, thumbnailImage)
        if (!levelImage) console.log("Not found", transformedLevelName, levelImage)
        const classes = ["Level"];
        const navigationClasses = ["navigation"];
        if (level.hasPreviousLevel) navigationClasses.push("hasPreviousLevel");
        if (level.hasNextLevel) navigationClasses.push("hasNextLevel");
        if (level.isNew) classes.push("isNew");
        if (level.isUnreleased) return <span>This level hasn't been released yet.</span>;

        return {
            ...level,
            classes,
            navigationClasses,
            levelImage,
            makerImage,
            transformedLevelName,
            transformedMakerName,
        };
    }, [level, levelData, params, theme]);

    return (
        <LevelContext.Provider value={level}>
            {children}
        </LevelContext.Provider>
    )
}