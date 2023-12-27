import { snakeCase } from "lodash";
import styles from "./Tags.module.css";
import classNames from "classnames";

const safeSnakecase = (str: string) => snakeCase(str).replace(/[^a-z0-9-]/g, '');

export function Tags({ tags }: Readonly<{ tags: string[] }>) {
    return (
        <div className={styles.Tags}>
            {tags.map((tag) => {
                const tagSnake = safeSnakecase(tag) as keyof typeof styles;
                return (
                    <span className={classNames(styles.Tag, styles[tagSnake])} key={tagSnake}>
                        {tag}
                    </span>
                )
            })}
        </div>
    );
}
