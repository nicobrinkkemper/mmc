const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
export default formatDate;
export { formatDate };
