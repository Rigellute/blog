export function formatDate(date: Date) {
  return date.toLocaleDateString('en-us', {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
