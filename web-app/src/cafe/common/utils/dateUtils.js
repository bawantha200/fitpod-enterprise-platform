/**
 * dateUtils.js
 * ------------------------------------------------------------------
 * Small date helpers for the reports. Everything uses the LOCAL time
 * of the computer (the cafe's own day), and weeks start on Monday.
 * Month and day names are written out here (not taken from the
 * browser) so reports read the same on every computer.
 * ------------------------------------------------------------------
 */

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MS_PER_DAY = 24 * 60 * 60 * 1000;

const pad = (number) => String(number).padStart(2, '0');

/** Midnight at the start of the given day. */
export const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** The date `days` days later (negative = earlier), at midnight. */
export const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

/** The Monday of the week the date is in. */
export function startOfWeek(date) {
  const daysSinceMonday = (date.getDay() + 6) % 7;
  return addDays(date, -daysSinceMonday);
}

/** Date -> "2026-11-23", the format of <input type="date">. */
export function toDateInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "2026-11-23" -> Date, or null if it is empty or not a real date (like 2026-02-31). */
export function parseDateInput(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text ?? '');
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  const isReal = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isReal ? date : null;
}

/** "23 Nov" */
export const formatShortDate = (date) => `${date.getDate()} ${MONTH_SHORT[date.getMonth()]}`;

/** "23 Nov 2026" */
export const formatDateWithYear = (date) => `${formatShortDate(date)} ${date.getFullYear()}`;

/** "Monday, 23 November 2026" */
export const formatLongDate = (date) =>
  `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

/** 6 -> "6am", 12 -> "12pm", 15 -> "3pm" */
export function formatHourLabel(hour) {
  const suffix = hour % 24 < 12 ? 'am' : 'pm';
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour}${suffix}`;
}

/** ISO date -> "2026-11-23 14:05" (24-hour, easy to sort in a spreadsheet). */
export function formatSortableDateTime(isoDate) {
  const date = new Date(isoDate);
  return `${toDateInputValue(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
