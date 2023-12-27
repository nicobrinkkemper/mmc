import styles from "./MakerName.module.css";

export function MakerName({ makerName, nationality, makerId }: Readonly<{
    nationality: string;
    makerName: string;
    makerId?: string;
}>) {
    return <div className={styles.MakerName}>
        <span
            className={`${styles.Nationality} flag-icon flag-icon-${nationality.toLowerCase()}`}
        />
        <span className={styles.Name}>
            {makerName}
        </span>
        {
            makerId ? <span className={styles.MakerId}>{makerId}</span> : null
        }
    </div>
}