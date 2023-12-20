
export function MakerName({ makerName, nationality }: Readonly<{
    nationality: string;
    makerName: string;
}>) {
    return <div className={"makerName"}>
        <span className="name">
            <span
                className={`nationality flag-icon flag-icon-${nationality.toLowerCase()}`}
            />
            {makerName}
        </span>
    </div>
}