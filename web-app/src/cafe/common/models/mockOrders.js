/**
 * mockOrders.js  (Model layer)
 * ------------------------------------------------------------------
 * TEMPORARY fake orders so the screens can be built and demonstrated
 * before the backend exists. Deleted/replaced when the real API is
 * connected (see cafeOrderService.js).
 * Prices are the same as the group's draft website (Rs.).
 * ------------------------------------------------------------------
 */
import { ORDER_SOURCE, ORDER_STATUS, calculateOrderTotal } from './cafeOrder';

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();

const GREEN_ENERGY = { menuItemId: 'm1', name: 'Green Energy', unitPrice: 650 };
const ORANGE_BOOST = { menuItemId: 'm2', name: 'Orange Boost', unitPrice: 550 };
const BERRY_POWER = { menuItemId: 'm3', name: 'Berry Power', unitPrice: 700 };
const BANANA_OAT = { menuItemId: 'm6', name: 'Banana Oat', unitPrice: 680 };
const MANGO_PROTEIN = { menuItemId: 'm7', name: 'Mango Protein', unitPrice: 750 };
const ICED_GREEN_TEA = { menuItemId: 'm9', name: 'Iced Green Tea', unitPrice: 400 };

/** Builds one order and fills in `total` and `createdAt` automatically. */
function buildOrder({ history, items, ...rest }) {
  return {
    notes: '',
    rejectionReason: '',
    ...rest,
    items,
    total: calculateOrderTotal(items),
    createdAt: history[0].at,
    statusHistory: history,
  };
}

/** Returns a FRESH copy every time, so changes never leak between runs. */
export function createMockOrders() {
  return [
    buildOrder({
      id: 'o1042', orderNumber: '1042', source: ORDER_SOURCE.MOBILE, customerName: 'Nimali Perera',
      status: ORDER_STATUS.PENDING, notes: 'Less sugar please',
      items: [{ ...GREEN_ENERGY, quantity: 1 }, { ...BERRY_POWER, quantity: 2 }],
      history: [{ status: ORDER_STATUS.PENDING, at: minutesAgo(4), note: 'Order placed from the mobile app' }],
    }),
    buildOrder({
      id: 'o1041', orderNumber: '1041', source: ORDER_SOURCE.MOBILE, customerName: 'Kasun Fernando',
      status: ORDER_STATUS.PENDING,
      items: [{ ...ORANGE_BOOST, quantity: 2 }],
      history: [{ status: ORDER_STATUS.PENDING, at: minutesAgo(9), note: 'Order placed from the mobile app' }],
    }),
    buildOrder({
      id: 'o1040', orderNumber: '1040', source: ORDER_SOURCE.WALK_IN, customerName: 'Amila Rathnayake',
      status: ORDER_STATUS.ACCEPTED,
      items: [{ ...GREEN_ENERGY, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(14), note: 'Walk-in order created' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(13), note: '' },
      ],
    }),
    buildOrder({
      id: 'o1039', orderNumber: '1039', source: ORDER_SOURCE.MOBILE, customerName: 'Tharindu Silva',
      status: ORDER_STATUS.PREPARING,
      items: [{ ...BERRY_POWER, quantity: 1 }, { ...ORANGE_BOOST, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(22), note: 'Order placed from the mobile app' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(20), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(17), note: '' },
      ],
    }),
    buildOrder({
      id: 'o1038', orderNumber: '1038', source: ORDER_SOURCE.MOBILE, customerName: 'Ishara Jayasinghe',
      status: ORDER_STATUS.READY, notes: 'Pick-up at 6.30 pm',
      items: [{ ...GREEN_ENERGY, quantity: 2 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(35), note: 'Order placed from the mobile app' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(33), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(30), note: '' },
        { status: ORDER_STATUS.READY, at: minutesAgo(24), note: '' },
      ],
    }),
    // The finished orders below are NOT "incoming" - they appear in Order History.
    buildOrder({
      id: 'o1037', orderNumber: '1037', source: ORDER_SOURCE.WALK_IN, customerName: 'Sanduni Perera',
      status: ORDER_STATUS.COMPLETED,
      items: [{ ...ORANGE_BOOST, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(70), note: 'Walk-in order created' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(69), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(66), note: '' },
        { status: ORDER_STATUS.READY, at: minutesAgo(61), note: '' },
        { status: ORDER_STATUS.COMPLETED, at: minutesAgo(58), note: '' },
      ],
    }),
    buildOrder({
      id: 'o1036', orderNumber: '1036', source: ORDER_SOURCE.MOBILE, customerName: 'Dilini Wickramasinghe',
      status: ORDER_STATUS.REJECTED, rejectionReason: 'Berry Power is out of stock today',
      items: [{ ...BERRY_POWER, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(90), note: 'Order placed from the mobile app' },
        { status: ORDER_STATUS.REJECTED, at: minutesAgo(88), note: 'Berry Power is out of stock today' },
      ],
    }),
    buildOrder({
      id: 'o1035', orderNumber: '1035', source: ORDER_SOURCE.MOBILE, customerName: 'Chamari Gunawardena',
      status: ORDER_STATUS.COMPLETED,
      items: [{ ...MANGO_PROTEIN, quantity: 1 }, { ...BANANA_OAT, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(130), note: 'Order placed from the mobile app' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(128), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(125), note: '' },
        { status: ORDER_STATUS.READY, at: minutesAgo(118), note: '' },
        { status: ORDER_STATUS.COMPLETED, at: minutesAgo(115), note: '' },
      ],
    }),
    buildOrder({
      id: 'o1034', orderNumber: '1034', source: ORDER_SOURCE.WALK_IN, customerName: 'Roshan Peiris',
      status: ORDER_STATUS.COMPLETED, notes: 'Extra ice',
      items: [{ ...ICED_GREEN_TEA, quantity: 2 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(112), note: 'Walk-in order created by staff' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(112), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(109), note: '' },
        { status: ORDER_STATUS.READY, at: minutesAgo(103), note: '' },
        { status: ORDER_STATUS.COMPLETED, at: minutesAgo(100), note: '' },
      ],
    }),
    buildOrder({
      id: 'o1033', orderNumber: '1033', source: ORDER_SOURCE.MOBILE, customerName: 'Nadeesha Fonseka',
      status: ORDER_STATUS.CANCELLED,
      items: [{ ...ORANGE_BOOST, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(150), note: 'Order placed from the mobile app' },
        { status: ORDER_STATUS.CANCELLED, at: minutesAgo(148), note: 'Cancelled by the customer' },
      ],
    }),
    buildOrder({
      id: 'o1031', orderNumber: '1031', source: ORDER_SOURCE.WALK_IN, customerName: 'Pavithra Silva',
      status: ORDER_STATUS.COMPLETED,
      items: [{ ...GREEN_ENERGY, quantity: 1 }, { ...ICED_GREEN_TEA, quantity: 1 }],
      history: [
        { status: ORDER_STATUS.PENDING, at: minutesAgo(1500), note: 'Walk-in order created by staff' },
        { status: ORDER_STATUS.ACCEPTED, at: minutesAgo(1500), note: '' },
        { status: ORDER_STATUS.PREPARING, at: minutesAgo(1497), note: '' },
        { status: ORDER_STATUS.READY, at: minutesAgo(1491), note: '' },
        { status: ORDER_STATUS.COMPLETED, at: minutesAgo(1488), note: '' },
      ],
    }),
  ];
}
