export function formatDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatLastUpdated(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `Cập nhật lần cuối: ${hours}:${minutes}, ${day}/${month}/${year}`;
}

export function isOverdue(dueDateIso: string): boolean {
  if (!dueDateIso) return false;
  return new Date(dueDateIso).getTime() < Date.now();
}

export function daysLeft(dueDateIso: string): number {
  if (!dueDateIso) return 0;
  const diffTime = new Date(dueDateIso).getTime() - Date.now();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
