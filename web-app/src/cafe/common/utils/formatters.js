/**
 * formatters.js
 * Small helpers that turn raw values into text people can read.
 */

/** 1250 -> "Rs. 1,250" */
export function formatCurrency(amount) {
  return `Rs. ${Number(amount).toLocaleString('en-US')}`;
}

/** ISO date -> "4 min ago", "2 h ago", or a date for older times. */
export function formatTimeAgo(isoDate) {
  const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(isoDate).toLocaleDateString('en-GB');
}

/** ISO date -> "10:42 AM" */
export function formatClockTime(isoDate) {
  return new Date(isoDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/** ISO date -> "24 Nov, 10:42 AM" (used where older orders need a date too). */
export function formatDateTime(isoDate) {
  const date = new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return `${date}, ${formatClockTime(isoDate)}`;
}
