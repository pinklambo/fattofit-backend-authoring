// src/utils/date.ts
// Global date helper for formatting Firestore and JS date values

/**
 * Formats a Firestore Timestamp, JS Date, ISO string, or number to a readable string.
 * @param value - Firestore Timestamp, JS Date, ISO string, or number
 * @param opts - Intl.DateTimeFormat options
 * @returns {string} formatted date or empty string if invalid
 */
export function formatDate(value: any, opts?: Intl.DateTimeFormatOptions): string {
  if (!value) return '';
  let date: Date | null = null;

  // Firestore Timestamp (native or plain object from persisted state)
  if (
    typeof value === 'object' && value !== null && (
      typeof value.toDate === 'function' ||
      (typeof value.seconds === 'number' && typeof value.nanoseconds === 'number')
    )
  ) {
    if (typeof value.toDate === 'function') {
      date = value.toDate();
    } else {
      // Convert plain object to Date
      date = new Date(value.seconds * 1000 + Math.floor(value.nanoseconds / 1e6));
    }
  } else if (typeof value === 'string' || typeof value === 'number') {
    date = new Date(value);
  } else if (value instanceof Date) {
    date = value;
  }
  if (!date || isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, opts);
}

