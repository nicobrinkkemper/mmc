export const formatDate = (date) => new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
}).format(date);
//# sourceMappingURL=formatDate.mjs.map