/**
 * reportCsv.js
 * ------------------------------------------------------------------
 * Turns a report (from buildReport) into a CSV file that opens in
 * Excel / Google Sheets, and downloads it.
 *
 *   buildReportCsv(report)   -> the CSV text (pure, easy to test)
 *   exportReportCsv(report)  -> builds it and starts the download
 * ------------------------------------------------------------------
 */
import { addDays, formatSortableDateTime, toDateInputValue } from './dateUtils';

/**
 * One CSV cell. Text with commas, quotes or line breaks is wrapped in quotes.
 * Text that starts with = + - @ would be treated as a FORMULA by Excel (a
 * customer could type "=HYPERLINK(...)" as their name), so it gets a ' in front.
 */
function cell(value) {
  if (typeof value === 'number') return String(value);
  let text = String(value ?? '');
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const row = (...cells) => cells.map(cell).join(',');

/** The whole report as CSV text (Excel-friendly: BOM at the start, CRLF line ends). */
export function buildReportCsv(report) {
  const { summary } = report;
  const lines = [
    row('FitPod Cafe Report'),
    row('Period', report.period.label),
    row('Category', report.filters.categoryName),
    row('Order type', report.filters.sourceLabel),
    row('Generated', formatSortableDateTime(report.generatedAt)),
    row('Note', 'Sales count completed orders only. All amounts are in Rs.'),
    '',
    row('Summary'),
    row('Measure', 'Value'),
    row('Sales (completed orders)', summary.sales),
    row('Pending sales (orders in progress)', summary.pendingSales),
    row('Orders placed', summary.ordersPlaced),
    row('Completed orders', summary.completedOrders),
    row('In progress', summary.inProgressOrders),
    row('Rejected orders', summary.rejectedOrders),
    row('Cancelled orders', summary.cancelledOrders),
    row('Items sold', summary.itemsSold),
    row('Average order value', summary.averageOrderValue),
    '',
    row('Sales trend'),
    row('Time', 'Sales', 'Orders placed'),
    ...report.trend.map((bucket) => row(bucket.fullLabel, bucket.sales, bucket.orders)),
    '',
    row('Sales by category'),
    row('Category', 'Sales', 'Items sold'),
    ...report.categoryBreakdown.map((entry) => row(entry.name, entry.sales, entry.quantity)),
    '',
    row('Top selling items'),
    row('Item', 'Items sold', 'Sales'),
    ...report.topItems.map((entry) => row(entry.name, entry.quantity, entry.sales)),
    '',
    row('Mobile and walk-in orders'),
    row('Order type', 'Orders placed', 'Sales'),
    ...report.sourceBreakdown.map((entry) => row(entry.label, entry.orders, entry.sales)),
    '',
    row('Orders placed by hour of the day'),
    row('Hour', 'Orders placed'),
    ...report.hourBreakdown.map((entry) => row(entry.label, entry.orders)),
    '',
    row('Orders'),
    row('Order', 'Placed', 'Customer', 'Type', 'Status', 'Items', 'Amount'),
    ...report.orders.map((order) =>
      row(order.orderNumber, formatSortableDateTime(order.placedAt), order.customerName, order.sourceLabel, order.statusLabel, order.itemsText, order.amount)
    ),
  ];
  return `\uFEFF${lines.join('\r\n')}\r\n`;
}

/** "fitpod-cafe-report_2026-11-01_to_2026-11-30" (no extension). */
export function reportFileBase(report) {
  const first = new Date(report.period.start);
  const last = addDays(new Date(report.period.end), -1); // `end` is the first moment AFTER the period
  return `fitpod-cafe-report_${toDateInputValue(first)}_to_${toDateInputValue(last)}`;
}

/** Starts a browser download of a Blob. */
export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Builds the CSV and downloads it. */
export function exportReportCsv(report) {
  const blob = new Blob([buildReportCsv(report)], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, `${reportFileBase(report)}.csv`);
}
