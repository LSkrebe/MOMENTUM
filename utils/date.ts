export function isToday(dateStr: string | undefined) {
  if (!dateStr) return false;
  return dateStr === new Date().toISOString().slice(0, 10);
} 