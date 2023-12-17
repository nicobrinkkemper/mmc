function reduceResizeJobGroupToData(data, job) {
    const { output: { reference, placeholder, href, version }, } = job;
    const hasReference = data && reference in data;
    const fallbackVersion = version || "versions";
    const hasVersion = hasReference &&
        typeof data[reference] === "object" &&
        fallbackVersion in data[reference];
    const outputConditional = {
        ...(hasReference && data[reference]),
        ...(placeholder && { placeholder }),
        ...(hasVersion
            ? {
                [fallbackVersion]: [
                    ...data[reference][fallbackVersion],
                    href,
                ],
            }
            : {
                [fallbackVersion]: [href],
                ...(placeholder && job.userInfo.resize),
            }),
    };
    return {
        ...data,
        [reference]: outputConditional,
    };
}
export function jobGroupToData(jobGroup) {
    return jobGroup.reduce(reduceResizeJobGroupToData, {});
}
