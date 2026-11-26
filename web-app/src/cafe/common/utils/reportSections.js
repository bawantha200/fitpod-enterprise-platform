/**
 * reportSections.js
 * ------------------------------------------------------------------
 * Decides WHAT goes into a downloaded report document (PDF or Word),
 * in plain data: the title, the summary cards, each chart's rows and
 * the order table. The PDF and Word builders only decide how to DRAW
 * it, so both files always contain the same things.
 * ------------------------------------------------------------------
 */
import { formatSortableDateTime } from './dateUtils';
import { formatCurrency } from './formatters';

/** Long reports list only the latest orders (the CSV has every order). */
export const MAX_DOCUMENT_ORDER_ROWS = 500;

const TREND_TITLES = { hour: 'Sales by hour', day: 'Sales by day', week: 'Sales by week', month: 'Sales by month' };
const NO_SALES_MESSAGE = 'No completed orders in this period yet.';

const percent = (value, total) => (total > 0 ? Math.round((value / total) * 100) : 0);

/**
 * Turns a report (from buildReport) into the content of a document.
 * Chart `kind` is 'columns' (values over time) or 'bars' (a ranking or shares).
 */
export function describeReport(report) {
  const { summary } = report;

  const charts = [
    {
      key: 'trend',
      title: TREND_TITLES[report.period.granularity],
      description: 'Sales from completed orders.',
      kind: 'columns',
      color: 'green',
      rows: report.trend.map((bucket) => ({
        label: bucket.label,
        value: bucket.sales,
        valueText: formatCurrency(bucket.sales),
      })),
      isEmpty: summary.sales === 0,
      emptyMessage: NO_SALES_MESSAGE,
    },
    {
      key: 'status',
      title: 'Orders by status',
      description: 'All orders placed in this period.',
      kind: 'bars',
      color: 'green',
      rows: report.statusBreakdown.map((entry) => ({
        label: entry.label,
        value: entry.count,
        valueText: `${entry.count} (${percent(entry.count, summary.ordersPlaced)}%)`,
      })),
      isEmpty: false,
    },
    {
      key: 'category',
      title: 'Sales by category',
      description: 'Completed orders, by menu category.',
      kind: 'bars',
      color: 'green',
      rows: report.categoryBreakdown.map((entry) => ({
        label: entry.name,
        value: entry.sales,
        valueText: `${formatCurrency(entry.sales)} (${percent(entry.sales, summary.sales)}%)`,
      })),
      isEmpty: report.categoryBreakdown.length === 0,
      emptyMessage: NO_SALES_MESSAGE,
    },
    {
      key: 'items',
      title: 'Top selling items',
      description: 'By number sold, completed orders.',
      kind: 'bars',
      color: 'green',
      rows: report.topItems.map((entry) => ({
        label: entry.name,
        value: entry.quantity,
        valueText: `${entry.quantity} sold, ${formatCurrency(entry.sales)}`,
      })),
      isEmpty: report.topItems.length === 0,
      emptyMessage: NO_SALES_MESSAGE,
    },
    {
      key: 'source',
      title: 'Mobile and walk-in orders',
      description: 'All orders placed in this period.',
      kind: 'bars',
      color: 'green',
      rows: report.sourceBreakdown.map((entry) => ({
        label: entry.label,
        value: entry.orders,
        valueText: `${entry.orders} (${percent(entry.orders, summary.ordersPlaced)}%), ${formatCurrency(entry.sales)} sales`,
      })),
      isEmpty: false,
    },
  ];

  // The hours chart only makes sense over more than one day.
  if (report.period.granularity !== 'hour') {
    charts.push({
      key: 'hours',
      title: 'Busiest hours',
      description: 'Orders placed in each hour of the day, added up over the whole period.',
      kind: 'columns',
      color: 'blue',
      rows: report.hourBreakdown.map((entry) => ({ label: entry.label, value: entry.orders, valueText: `${entry.orders} orders` })),
      isEmpty: false,
    });
  }

  return {
    title: 'FitPod Cafe Report',
    periodLabel: report.period.label,
    filterLine: `${report.filters.categoryName}, ${report.filters.sourceLabel}`,
    generatedLine: `Generated ${formatSortableDateTime(report.generatedAt)}`,
    note:
      'Sales count completed orders only. Rejected and cancelled orders never earn money, and orders still in progress ' +
      'are shown as pending sales. An order belongs to the period in which it was placed. All amounts are in Rs.',
    summaryCards: [
      { label: 'Sales', value: formatCurrency(summary.sales), hint: 'Completed orders only' },
      { label: 'Orders placed', value: String(summary.ordersPlaced) },
      { label: 'Completed orders', value: String(summary.completedOrders) },
      { label: 'Average order value', value: formatCurrency(summary.averageOrderValue) },
      { label: 'Pending sales', value: formatCurrency(summary.pendingSales), hint: 'Orders still in progress' },
      { label: 'In progress', value: String(summary.inProgressOrders) },
      { label: 'Rejected or cancelled', value: String(summary.rejectedOrders + summary.cancelledOrders) },
      { label: 'Items sold', value: String(summary.itemsSold) },
    ],
    hasOrders: summary.ordersPlaced > 0,
    emptyMessage: 'No orders match this period and these filters.',
    charts,
    ordersHead: ['Order', 'Placed', 'Customer', 'Type', 'Status', 'Items', 'Amount'],
    orderRows: report.orders
      .slice(0, MAX_DOCUMENT_ORDER_ROWS)
      .map((order) => [
        order.orderNumber,
        formatSortableDateTime(order.placedAt),
        order.customerName,
        order.sourceLabel,
        order.statusLabel,
        order.itemsText,
        formatCurrency(order.amount),
      ]),
    ordersNote:
      report.orders.length > MAX_DOCUMENT_ORDER_ROWS
        ? `Showing the latest ${MAX_DOCUMENT_ORDER_ROWS} of ${report.orders.length} orders. Download the CSV for the complete list.`
        : '',
  };
}
