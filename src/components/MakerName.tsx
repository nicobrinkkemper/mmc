import styles from "./MakerName.module.css";

export function MakerName({ makerName, nationality, makerId }: Readonly<{
    nationality: string;
    makerName: string;
    makerId?: string;
}>) {
    // Split nationality and makerName into arrays
    const nationalities = nationality.split(",").map((nat) => nat.trim());
    const makerNames = makerName.split(",").map((name) => name.trim());

    return (
        <div className={styles.MakerName}>
            <div className={styles.MakerDetails}>
                {makerNames.map((name, index) => (
                    <span key={index} className={styles.MakerPair}>
                        <span
                            className={`${styles.Nationality} flag-icon flag-icon-${nationalities[index]?.toLowerCase() || "unknown"}`}
                        />
                        {name}
                    </span>
                ))}
            </div>
            {makerId && <span className={styles.MakerId}>{makerId}</span>}
        </div>
    );
}
