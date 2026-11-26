/**
 * cafeReport.js  (Model layer)
 * ------------------------------------------------------------------
 * The brain of the Reports page, with NO React and NO API calls:
 *   resolvePeriod(...)  turns "Weekly, this date" into exact start/end times
 *   buildReport(...)    turns a list of orders into all the numbers and
 *                       chart data of one report
 *
 * HOW THE NUMBERS ARE COUNTED (these rules are shown on the page too):
 *   - An order belongs to the period in which it was PLACED.
 *   - SALES count COMPLETED orders only. Rejected and cancelled orders
 *     never earn money, and orders still in progress may still change.
 *   - Orders still in progress are shown separately as "pending sales".
 *   - Category filter: only the items of that category are counted, and
 *     only orders that contain such an item. Order type filter: mobile
 *     pre-orders or walk-in orders only.
 * ------------------------------------------------------------------
 */
import {
  ACTIVE_STATUSES,
  ORDER_SOURCE,
  ORDER_SOURCE_LABELS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  calculateOrderTotal,
} from './cafeOrder';
import {
  DAY_SHORT,
  MONTH_SHORT,
  MS_PER_DAY,
  addDays,
  formatDateWithYear,
  formatHourLabel,
  formatLongDate,
  formatShortDate,
  parseDateInput,
  startOfDay,
  startOfWeek,
} from '../utils/dateUtils';

export const PERIOD_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
};

/** The longest custom period allowed. */
export const MAX_CUSTOM_DAYS = 366;

/** "23 Nov to 29 Nov 2026" (years are shown on both dates only when they differ). */
function rangeLabel(first, last) {
  if (first.getFullYear() === last.getFullYear()) {
    return `${formatShortDate(first)} to ${formatDateWithYear(last)}`;
  }
  return `${formatDateWithYear(first)} to ${formatDateWithYear(last)}`;
}

/**
 * Turns what the admin picked into an exact period.
 *   input = { type, dateValue, monthValue (0-11), yearValue, fromValue, toValue }
 * Returns { error: '' , type, start, end, label, granularity } where start
 * and end are ISO strings (end is the first moment AFTER the period), or
 * { error: 'message' } when the choice is not valid.
 * `granularity` says how the sales trend is cut up: hour, day, week or month.
 */
export function resolvePeriod(input) {
  let start;
  let end;
  let label;
  let granularity;

  if (input.type === PERIOD_TYPES.DAILY) {
    const day = parseDateInput(input.dateValue);
    if (!day) return { error: 'Choose a valid date.' };
    start = day;
    end = addDays(day, 1);
    label = formatLongDate(day);
    granularity = 'hour';
  } else if (input.type === PERIOD_TYPES.WEEKLY) {
    const day = parseDateInput(input.dateValue);
    if (!day) return { error: 'Choose a valid date.' };
    start = startOfWeek(day);
    end = addDays(start, 7);
    label = `Week: ${rangeLabel(start, addDays(start, 6))}`;
    granularity = 'day';
  } else if (input.type === PERIOD_TYPES.MONTHLY) {
    const year = Number(input.yearValue);
    const month = Number(input.monthValue);
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) {
      return { error: 'Choose a valid month and year.' };
    }
    start = new Date(year, month, 1);
    end = new Date(year, month + 1, 1);
    label = `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]} ${year}`;
    granularity = 'day';
  } else if (input.type === PERIOD_TYPES.CUSTOM) {
    const from = parseDateInput(input.fromValue);
    const to = parseDateInput(input.toValue);
    if (!from || !to) return { error: 'Choose both the start and the end date.' };
    if (to < from) return { error: 'The end date cannot be before the start date.' };
    const days = Math.round((to - from) / MS_PER_DAY) + 1;
    if (days > MAX_CUSTOM_DAYS) return { error: `A custom period can be at most ${MAX_CUSTOM_DAYS} days.` };
    start = from;
    end = addDays(to, 1);
    label = rangeLabel(from, to);
    granularity = days <= 31 ? 'day' : days <= 180 ? 'week' : 'month';
  } else {
    return { error: 'Choose a report type.' };
  }

  return { error: '', type: input.type, start: start.toISOString(), end: end.toISOString(), label, granularity };
}

/**
 * Prepares the "buckets" of the sales trend (for example one per hour, or one
 * per day) and a function that says which bucket a date belongs to.
 */
function makeBuckets(period, selected) {
  const start = new Date(period.start);
  const end = new Date(period.end);
  const empty = (label, fullLabel) => ({ label, fullLabel, sales: 0, orders: 0 });

  if (period.granularity === 'hour') {
    // Opening hours default to 6am-9pm, widened if an order came outside them.
    let first = 6;
    let last = 21;
    selected.forEach(({ placed }) => {
      first = Math.min(first, placed.getHours());
      last = Math.max(last, placed.getHours());
    });
    const buckets = [];
    for (let hour = first; hour <= last; hour += 1) buckets.push(empty(formatHourLabel(hour), formatHourLabel(hour)));
    return { buckets, indexOf: (date) => date.getHours() - first };
  }

  if (period.granularity === 'day') {
    const dayCount = Math.round((end - start) / MS_PER_DAY);
    const buckets = [];
    for (let i = 0; i < dayCount; i += 1) {
      const date = addDays(start, i);
      const label =
        period.type === PERIOD_TYPES.WEEKLY
          ? `${DAY_SHORT[date.getDay()]} ${date.getDate()}`
          : period.type === PERIOD_TYPES.MONTHLY
            ? String(date.getDate())
            : formatShortDate(date);
      buckets.push(empty(label, `${DAY_SHORT[date.getDay()]}, ${formatDateWithYear(date)}`));
    }
    return { buckets, indexOf: (date) => Math.round((startOfDay(date) - start) / MS_PER_DAY) };
  }

  if (period.granularity === 'week') {
    const firstMonday = startOfWeek(start);
    const weekCount = Math.ceil((end - firstMonday) / (7 * MS_PER_DAY));
    const buckets = [];
    for (let i = 0; i < weekCount; i += 1) {
      const monday = addDays(firstMonday, i * 7);
      buckets.push(empty(formatShortDate(monday), `Week of ${formatDateWithYear(monday)}`));
    }
    return { buckets, indexOf: (date) => Math.round((startOfWeek(date) - firstMonday) / (7 * MS_PER_DAY)) };
  }

  // month
  const monthCount = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const buckets = [];
  for (let i = 0; i < monthCount; i += 1) {
    const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
    buckets.push(empty(`${MONTH_SHORT[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`, `${MONTH_SHORT[date.getMonth()]} ${date.getFullYear()}`));
  }
  return {
    buckets,
    indexOf: (date) => (date.getFullYear() - start.getFullYear()) * 12 + (date.getMonth() - start.getMonth()),
  };
}

/**
 * Builds one complete report.
 *   orders     - all orders (any status)
 *   period     - from resolvePeriod()
 *   filters    - { categoryId: string | null, source: 'mobile' | 'walk_in' | null }
 *   categories - [{ id, name }], used to show category names
 */
export function buildReport(orders, period, filters, categories) {
  const start = new Date(period.start);
  const end = new Date(period.end);
  const categoryNames = Object.fromEntries(categories.map((category) => [category.id, category.name]));

  // 1. Pick the orders that match the period and filters.
  const selected = [];
  orders.forEach((order) => {
    const placed = new Date(order.createdAt);
    if (placed < start || placed >= end) return;
    if (filters.source && order.source !== filters.source) return;
    const lines = filters.categoryId ? order.items.filter((item) => item.categoryId === filters.categoryId) : order.items;
    if (lines.length === 0) return;
    selected.push({ order, lines, amount: calculateOrderTotal(lines), placed });
  });

  // 2. Add everything up.
  const summary = {
    ordersPlaced: selected.length,
    completedOrders: 0,
    inProgressOrders: 0,
    rejectedOrders: 0,
    cancelledOrders: 0,
    sales: 0,
    pendingSales: 0,
    itemsSold: 0,
    averageOrderValue: 0,
  };
  const { buckets, indexOf } = makeBuckets(period, selected);
  const hourCounts = new Map();
  const categoryTotals = new Map();
  const itemTotals = new Map();
  const sourceTotals = {
    [ORDER_SOURCE.MOBILE]: { orders: 0, sales: 0 },
    [ORDER_SOURCE.WALK_IN]: { orders: 0, sales: 0 },
  };

  selected.forEach(({ order, lines, amount, placed }) => {
    const bucket = buckets[indexOf(placed)];
    if (bucket) bucket.orders += 1;
    hourCounts.set(placed.getHours(), (hourCounts.get(placed.getHours()) ?? 0) + 1);
    sourceTotals[order.source].orders += 1;

    if (order.status === ORDER_STATUS.COMPLETED) {
      summary.completedOrders += 1;
      summary.sales += amount;
      sourceTotals[order.source].sales += amount;
      if (bucket) bucket.sales += amount;
      lines.forEach((line) => {
        summary.itemsSold += line.quantity;
        const lineSales = line.unitPrice * line.quantity;
        const categoryKey = categoryNames[line.categoryId] ?? 'Other';
        const category = categoryTotals.get(categoryKey) ?? { name: categoryKey, sales: 0, quantity: 0 };
        category.sales += lineSales;
        category.quantity += line.quantity;
        categoryTotals.set(categoryKey, category);
        const item = itemTotals.get(line.name) ?? { name: line.name, quantity: 0, sales: 0 };
        item.quantity += line.quantity;
        item.sales += lineSales;
        itemTotals.set(line.name, item);
      });
    } else if (ACTIVE_STATUSES.includes(order.status)) {
      summary.inProgressOrders += 1;
      summary.pendingSales += amount;
    } else if (order.status === ORDER_STATUS.REJECTED) {
      summary.rejectedOrders += 1;
    } else if (order.status === ORDER_STATUS.CANCELLED) {
      summary.cancelledOrders += 1;
    }
  });
  summary.averageOrderValue = summary.completedOrders > 0 ? Math.round(summary.sales / summary.completedOrders) : 0;

  // 3. Shape the chart data.
  const hours = [...hourCounts.keys()];
  const firstHour = Math.min(6, ...hours);
  const lastHour = Math.max(21, ...hours);
  const hourBreakdown = [];
  for (let hour = firstHour; hour <= lastHour; hour += 1) {
    hourBreakdown.push({ hour, label: formatHourLabel(hour), orders: hourCounts.get(hour) ?? 0 });
  }

  const byValueThenName = (a, b) => b.sales - a.sales || a.name.localeCompare(b.name);

  return {
    period: { type: period.type, label: period.label, granularity: period.granularity, start: period.start, end: period.end },
    filters: {
      categoryName: filters.categoryId ? categoryNames[filters.categoryId] ?? 'Unknown category' : 'All categories',
      sourceLabel: filters.source ? ORDER_SOURCE_LABELS[filters.source] : 'All order types',
    },
    generatedAt: new Date().toISOString(),
    summary,
    trend: buckets,
    statusBreakdown: [
      { key: 'completed', label: 'Completed', count: summary.completedOrders },
      { key: 'in_progress', label: 'In progress', count: summary.inProgressOrders },
      { key: 'rejected', label: ORDER_STATUS_LABELS[ORDER_STATUS.REJECTED], count: summary.rejectedOrders },
      { key: 'cancelled', label: ORDER_STATUS_LABELS[ORDER_STATUS.CANCELLED], count: summary.cancelledOrders },
    ],
    categoryBreakdown: [...categoryTotals.values()].sort(byValueThenName),
    topItems: [...itemTotals.values()]
      .sort((a, b) => b.quantity - a.quantity || byValueThenName(a, b))
      .slice(0, 8),
    sourceBreakdown: [ORDER_SOURCE.MOBILE, ORDER_SOURCE.WALK_IN].map((source) => ({
      key: source,
      label: ORDER_SOURCE_LABELS[source],
      orders: sourceTotals[source].orders,
      sales: sourceTotals[source].sales,
    })),
    hourBreakdown,
    orders: selected
      .sort((a, b) => b.placed - a.placed)
      .map(({ order, lines, amount }) => ({
        orderNumber: order.orderNumber,
        placedAt: order.createdAt,
        customerName: order.customerName,
        sourceLabel: ORDER_SOURCE_LABELS[order.source],
        statusLabel: ORDER_STATUS_LABELS[order.status],
        itemsText: lines.map((line) => `${line.quantity} x ${line.name}`).join(', '),
        amount,
      })),
  };
}
