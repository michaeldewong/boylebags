/**
 * Add N business days to a date (excludes weekends).
 */
export function addBusinessDays(from: Date, days: number): Date {
  const result = new Date(from);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const d = result.getDay();
    if (d !== 0 && d !== 6) added += 1;
  }
  return result;
}

/**
 * Format date as YYYY-MM-DD for input[type="date"] min attribute.
 */
export function toDateInputValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}
