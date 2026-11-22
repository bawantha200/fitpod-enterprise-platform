/**
 * cafeOrderService.js  (Service layer)
 * ------------------------------------------------------------------
 * The ONLY place the cafe screens get order data from.
 *
 * RIGHT NOW it works on fake in-memory data (mockOrders.js), with a
 * short delay to imitate a network call. Changes last until the page
 * is refreshed.
 *
 * LATER, when the backend is ready, each function below is replaced
 * by a call to apiClient (e.g. apiClient.get('/cafe/orders')). Because
 * the screens only call THESE functions, nothing else has to change.
 * ------------------------------------------------------------------
 */
import { createMockOrders } from '../models/mockOrders';
import { ACTIVE_STATUSES, ORDER_STATUS, canTransition } from '../models/cafeOrder';

const FAKE_DELAY_MS = 300;

let orders = createMockOrders();

/** Pretend to wait for the network. */
const wait = () => new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

/** Return a copy so screens can never change our stored data by accident. */
const copy = (value) => JSON.parse(JSON.stringify(value));

function findOrder(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error('This order could not be found. Please refresh the page.');
  return order;
}

/** Applies a status change if the rules allow it, and records it in the history. */
function applyStatus(order, newStatus, note = '') {
  if (!canTransition(order.status, newStatus)) {
    throw new Error(`This order is already "${order.status}", so it cannot be changed to "${newStatus}".`);
  }
  order.status = newStatus;
  order.statusHistory.push({ status: newStatus, at: new Date().toISOString(), note });
}

const cafeOrderService = {
  /** Orders that still need work, oldest first (the kitchen queue). */
  async getIncomingOrders() {
    await wait();
    const incoming = orders
      .filter((o) => ACTIVE_STATUSES.includes(o.status))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return copy(incoming);
  },

  /** Staff accepts a new order. */
  async acceptOrder(orderId) {
    await wait();
    const order = findOrder(orderId);
    applyStatus(order, ORDER_STATUS.ACCEPTED);
    return copy(order);
  },

  /** Staff rejects a new order. A written reason is REQUIRED. */
  async rejectOrder(orderId, reason) {
    await wait();
    const cleanReason = (reason ?? '').trim();
    if (!cleanReason) throw new Error('Please enter a reason for rejecting this order.');
    const order = findOrder(orderId);
    applyStatus(order, ORDER_STATUS.REJECTED, cleanReason);
    order.rejectionReason = cleanReason;
    return copy(order);
  },

  /** Moves an order forward: preparing, ready or completed. */
  async updateOrderStatus(orderId, newStatus) {
    await wait();
    const order = findOrder(orderId);
    applyStatus(order, newStatus);
    return copy(order);
  },

  /** For automated tests only: puts the fake data back to its start. */
  resetMockData() {
    orders = createMockOrders();
  },
};

export default cafeOrderService;
