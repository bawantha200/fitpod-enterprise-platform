/**
 * cafeOrder.js  (Model layer)
 * ------------------------------------------------------------------
 * What a cafe order IS, plus the business rules about its status.
 * No React and no API calls here - just plain data and functions,
 * so both the Staff and Admin screens (and tests) can share it.
 *
 * Shape of one order object:
 * {
 *   id, orderNumber,            // id is internal, orderNumber is shown to people
 *   source,                     // ORDER_SOURCE.MOBILE or ORDER_SOURCE.WALK_IN
 *   customerName,
 *   items: [{ menuItemId, name, quantity, unitPrice }],
 *   notes,                      // customer / staff note ('' if none)
 *   total,                      // sum of quantity * unitPrice
 *   status,                     // one of ORDER_STATUS
 *   rejectionReason,            // only set when the order was rejected
 *   createdAt,                  // ISO date string
 *   statusHistory: [{ status, at, note }]
 * }
 * ------------------------------------------------------------------
 */

export const ORDER_STATUS = {
  PENDING: 'pending',     // placed, waiting for staff to accept or reject
  ACCEPTED: 'accepted',   // staff accepted it
  PREPARING: 'preparing', // being made
  READY: 'ready',         // ready for pick-up
  COMPLETED: 'completed', // handed to the customer
  REJECTED: 'rejected',   // staff rejected it (with a reason)
  CANCELLED: 'cancelled', // cancelled (handled in a later step)
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'New',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.READY]: 'Ready',
  [ORDER_STATUS.COMPLETED]: 'Completed',
  [ORDER_STATUS.REJECTED]: 'Rejected',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const ORDER_SOURCE = {
  MOBILE: 'mobile',
  WALK_IN: 'walk_in',
};

export const ORDER_SOURCE_LABELS = {
  [ORDER_SOURCE.MOBILE]: 'Mobile pre-order',
  [ORDER_SOURCE.WALK_IN]: 'Walk-in',
};

/** Statuses that still need work from the staff ("incoming" orders). */
export const ACTIVE_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
];

/** Which status may follow which. Anything not listed is not allowed. */
export const ALLOWED_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.ACCEPTED, ORDER_STATUS.REJECTED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.ACCEPTED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.READY]: [ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.COMPLETED]: [],
  [ORDER_STATUS.REJECTED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

/**
 * The single "next step" button an accepted order shows.
 * (A pending order is different: it shows Accept AND Reject.)
 */
export const FORWARD_STEPS = {
  [ORDER_STATUS.ACCEPTED]: { to: ORDER_STATUS.PREPARING, label: 'Start preparing' },
  [ORDER_STATUS.PREPARING]: { to: ORDER_STATUS.READY, label: 'Mark as ready' },
  [ORDER_STATUS.READY]: { to: ORDER_STATUS.COMPLETED, label: 'Mark as completed' },
};

/** True if an order may move from one status to another. */
export function canTransition(from, to) {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Total price of a list of order items. */
export function calculateOrderTotal(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
