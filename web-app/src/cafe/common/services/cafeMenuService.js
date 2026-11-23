/**
 * cafeMenuService.js  (Service layer)
 * ------------------------------------------------------------------
 * The ONLY place the cafe screens get the menu from.
 * Like cafeOrderService, it works on fake in-memory data for now and
 * will be swapped for real apiClient calls when the backend is ready.
 * ------------------------------------------------------------------
 */
import { createMockMenu } from '../models/mockMenu';

const FAKE_DELAY_MS = 300;

let menu = createMockMenu();

const wait = () => new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));
const copy = (value) => JSON.parse(JSON.stringify(value));

/**
 * Looks up one menu item. Used ONLY by the fake order service so it can
 * take prices from the menu. The real backend will do this itself.
 */
export function findMenuItemById(menuItemId) {
  return menu.items.find((item) => item.id === menuItemId) ?? null;
}

const cafeMenuService = {
  /** All categories (e.g. Fresh Juices, Smoothies). */
  async getCategories() {
    await wait();
    return copy(menu.categories);
  },

  /** All menu items, including unavailable ones (screens show them greyed out). */
  async getMenuItems() {
    await wait();
    return copy(menu.items);
  },

  /** For automated tests only: puts the fake data back to its start. */
  resetMockData() {
    menu = createMockMenu();
  },
};

export default cafeMenuService;
