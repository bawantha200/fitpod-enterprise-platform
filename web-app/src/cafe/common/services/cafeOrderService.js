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
import {
  ACTIVE_STATUSES,
  FINISHED_STATUSES,
  MAX_CUSTOMER_NAME_LENGTH,
  MAX_NOTE_LENGTH,
  MAX_QUANTITY_PER_ITEM,
  ORDER_SOURCE,
  ORDER_STATUS,
  calculateOrderTotal,
  canTransition,
  getLastUpdated,
} from '../models/cafeOrder';
import { findMenuItemById } from './cafeMenuService';

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

  /** Every order, in any status, newest first (used by the Admin "All Orders" page). */
  async getAllOrders() {
    await wait();
    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) || Number(b.orderNumber) - Number(a.orderNumber)
    );
    return copy(sorted);
  },

  /** Finished orders (completed, rejected, cancelled), most recently updated first. */
  async getOrderHistory() {
    await wait();
    const finished = orders
      .filter((o) => FINISHED_STATUSES.includes(o.status))
      .sort((a, b) => new Date(getLastUpdated(b)) - new Date(getLastUpdated(a)));
    return copy(finished);
  },

  /**
   * Staff creates an order for a customer standing at the counter.
   * `items` is a list of { menuItemId, quantity }. A customer name is
   * REQUIRED (so we know who the order is for); notes are optional.
   * The PRICES come from the menu here (never from the screen) and the
   * total is calculated here too. A walk-in order starts as "accepted",
   * because the staff member is already serving the customer.
   */
  async createWalkInOrder({ items, notes = '', customerName = '' }) {
    await wait();

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Add at least one item to the order.');
    }
    if (new Set(items.map((i) => i.menuItemId)).size !== items.length) {
      throw new Error('Each item can only appear once. Change its quantity instead.');
    }
    const cleanNotes = notes.trim();
    const cleanName = customerName.trim();
    if (!cleanName) throw new Error('Please enter the customer name.');
    if (cleanNotes.length > MAX_NOTE_LENGTH) throw new Error(`Notes can be at most ${MAX_NOTE_LENGTH} characters.`);
    if (cleanName.length > MAX_CUSTOMER_NAME_LENGTH) {
      throw new Error(`The customer name can be at most ${MAX_CUSTOMER_NAME_LENGTH} characters.`);
    }

    const orderItems = items.map(({ menuItemId, quantity }) => {
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
        throw new Error(`Each quantity must be a whole number from 1 to ${MAX_QUANTITY_PER_ITEM}.`);
      }
      const menuItem = findMenuItemById(menuItemId);
      if (!menuItem) throw new Error('One of the items is no longer on the menu.');
      if (!menuItem.isAvailable) throw new Error(`${menuItem.name} is currently unavailable.`);
      return { menuItemId, name: menuItem.name, unitPrice: menuItem.price, categoryId: menuItem.categoryId, quantity };
    });

    const now = new Date().toISOString();
    const nextNumber = orders.reduce((max, o) => Math.max(max, Number(o.orderNumber)), 1000) + 1;
    const order = {
      id: `o${nextNumber}`,
      orderNumber: String(nextNumber),
      source: ORDER_SOURCE.WALK_IN,
      customerName: cleanName,
      items: orderItems,
      notes: cleanNotes,
      total: calculateOrderTotal(orderItems),
      status: ORDER_STATUS.ACCEPTED,
      rejectionReason: '',
      createdAt: now,
      statusHistory: [
        { status: ORDER_STATUS.PENDING, at: now, note: 'Walk-in order created by staff' },
        { status: ORDER_STATUS.ACCEPTED, at: now, note: '' },
      ],
    };
    orders.push(order);
    return copy(order);
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
