/**
 * mockReportOrders.js  (Model layer)
 * ------------------------------------------------------------------
 * TEMPORARY fake order HISTORY, only for the Reports page, so weekly
 * and monthly reports have enough data to show real charts. It makes
 * about 120 days of orders, ending yesterday.
 *
 * The numbers are "random" but always the SAME random numbers, so the
 * charts do not jump around every time the page reloads. These orders
 * do not appear in the Order lists (the real backend will have one
 * single list of orders and the report will simply count it).
 * ------------------------------------------------------------------
 */
import { ORDER_SOURCE, ORDER_STATUS, calculateOrderTotal } from './cafeOrder';

/** A small seeded random-number generator (same seed -> same numbers). */
function createRandom(seed) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// How popular each drink is (higher = ordered more often). Prices match the menu.
const DRINKS = [
  { menuItemId: 'm1', name: 'Green Energy', unitPrice: 650, categoryId: 'c2', weight: 1.5 },
  { menuItemId: 'm2', name: 'Orange Boost', unitPrice: 550, categoryId: 'c1', weight: 1.3 },
  { menuItemId: 'm3', name: 'Berry Power', unitPrice: 700, categoryId: 'c2', weight: 1.4 },
  { menuItemId: 'm4', name: 'Watermelon Splash', unitPrice: 480, categoryId: 'c1', weight: 0.9 },
  { menuItemId: 'm5', name: 'Pineapple Mint', unitPrice: 520, categoryId: 'c1', weight: 0.8 },
  { menuItemId: 'm6', name: 'Banana Oat', unitPrice: 680, categoryId: 'c2', weight: 1.0 },
  { menuItemId: 'm7', name: 'Mango Protein', unitPrice: 750, categoryId: 'c2', weight: 1.1 },
  { menuItemId: 'm8', name: 'Ginger Immunity Shot', unitPrice: 350, categoryId: 'c3', weight: 0.7 },
  { menuItemId: 'm9', name: 'Iced Green Tea', unitPrice: 400, categoryId: 'c3', weight: 0.9 },
  { menuItemId: 'm10', name: 'Coconut Water', unitPrice: 380, categoryId: 'c3', weight: 0.8 },
];

// How busy each hour is, from 6am to 9pm (morning, lunch and evening peaks).
const HOUR_WEIGHTS = [2, 4, 6, 4, 3, 4, 8, 9, 5, 3, 3, 5, 8, 9, 6, 3];
const FIRST_NAMES = ['Nimal', 'Kamal', 'Sunil', 'Dilani', 'Nuwan', 'Chathu', 'Ayesha', 'Ravindu', 'Sachini', 'Tharaka', 'Madhavi', 'Isuru'];
const LAST_NAMES = ['Perera', 'Silva', 'Fernando', 'Jayasuriya', 'Bandara', 'Wickrama', 'Gunawardena', 'Rathnayake'];
const REJECT_REASONS = ['An item is out of stock', 'The kitchen is too busy right now', 'The cafe is closing soon'];

/** Picks one entry of a list, where each entry has a `weight`. */
function pickWeighted(random, entries, getWeight) {
  const total = entries.reduce((sum, entry) => sum + getWeight(entry), 0);
  let target = random() * total;
  for (const entry of entries) {
    target -= getWeight(entry);
    if (target <= 0) return entry;
  }
  return entries[entries.length - 1];
}

/** Returns a FRESH list every time. `now` is only used to know what "yesterday" is. */
export function createMockHistoricalOrders(now = new Date(), dayCount = 120) {
  const random = createRandom(20260101);
  const orders = [];
  let counter = 0;

  for (let daysAgo = dayCount; daysAgo >= 1; daysAgo -= 1) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysAgo);
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const growth = 1 + (dayCount - daysAgo) / 400; // the cafe slowly gets busier
    const ordersToday = Math.round((isWeekend ? 13 : 9) * growth * (0.7 + random() * 0.6));

    for (let n = 0; n < ordersToday; n += 1) {
      counter += 1;
      const hour = pickWeighted(random, HOUR_WEIGHTS.map((weight, index) => ({ weight, hour: 6 + index })), (h) => h.weight).hour;
      const minute = Math.floor(random() * 60);
      const placed = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute);
      const at = (minutesLater) => new Date(placed.getTime() + minutesLater * 60000).toISOString();

      // 1 to 3 different drinks, each 1 or 2 of them.
      const lineCount = random() < 0.55 ? 1 : random() < 0.67 ? 2 : 3;
      const chosen = [];
      while (chosen.length < lineCount) {
        const drink = pickWeighted(random, DRINKS, (d) => d.weight);
        if (!chosen.includes(drink)) chosen.push(drink);
      }
      const items = chosen.map((drink) => ({
        menuItemId: drink.menuItemId,
        name: drink.name,
        unitPrice: drink.unitPrice,
        categoryId: drink.categoryId,
        quantity: random() < 0.75 ? 1 : 2,
      }));

      const source = random() < 0.6 ? ORDER_SOURCE.MOBILE : ORDER_SOURCE.WALK_IN;
      const roll = random();
      const createdNote = source === ORDER_SOURCE.MOBILE ? 'Order placed from the mobile app' : 'Walk-in order created by staff';
      let status = ORDER_STATUS.COMPLETED;
      let history = [
        { status: ORDER_STATUS.PENDING, at: at(0), note: createdNote },
        { status: ORDER_STATUS.ACCEPTED, at: at(1), note: '' },
        { status: ORDER_STATUS.PREPARING, at: at(3), note: '' },
        { status: ORDER_STATUS.READY, at: at(9), note: '' },
        { status: ORDER_STATUS.COMPLETED, at: at(12), note: '' },
      ];
      let rejectionReason = '';
      if (roll >= 0.95) {
        status = ORDER_STATUS.CANCELLED;
        history = [history[0], { status, at: at(2), note: 'Cancelled by the customer' }];
      } else if (roll >= 0.88) {
        status = ORDER_STATUS.REJECTED;
        rejectionReason = REJECT_REASONS[Math.floor(random() * REJECT_REASONS.length)];
        history = [history[0], { status, at: at(2), note: rejectionReason }];
      }

      orders.push({
        id: `h${counter}`,
        orderNumber: `H-${String(counter).padStart(4, '0')}`,
        source,
        customerName: `${FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(random() * LAST_NAMES.length)]}`,
        items,
        notes: '',
        total: calculateOrderTotal(items),
        status,
        rejectionReason,
        createdAt: placed.toISOString(),
        statusHistory: history,
      });
    }
  }
  return orders;
}
