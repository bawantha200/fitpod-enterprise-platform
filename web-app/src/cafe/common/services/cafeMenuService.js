/**
 * cafeMenuService.js  (Service layer)
 * ------------------------------------------------------------------
 * The ONLY place the cafe screens get (and change) the menu.
 * Like cafeOrderService, it works on fake in-memory data for now and
 * will be swapped for real apiClient calls when the backend is ready.
 *
 * "Removing" an item only HIDES it (isRemoved = true). Old orders keep
 * their own copy of the item's name and price, so history never breaks.
 * ------------------------------------------------------------------
 */
import { createMockMenu } from '../models/mockMenu';
import { validateMenuItemInput } from '../models/cafeMenuItem';
import { validateCategoryName } from '../models/cafeCategory';

const FAKE_DELAY_MS = 300;

let menu = createMockMenu();

/** The highest number in a list of ids like "c1", "c2" (used to hand out new ids). */
const highestNumber = (list) => list.reduce((max, entry) => Math.max(max, Number(entry.id.slice(1))), 0);

/**
 * Highest category number EVER used. Categories can be removed, so we
 * remember it separately: a removed category's id is never handed out
 * again (hidden menu items may still point at it).
 */
let lastCategoryNumber = highestNumber(menu.categories);

const wait = () => new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));
const copy = (value) => JSON.parse(JSON.stringify(value));

/** Items that have not been removed. */
const activeItems = () => menu.items.filter((item) => !item.isRemoved);

function findActiveItem(menuItemId) {
  const item = activeItems().find((i) => i.id === menuItemId);
  if (!item) throw new Error('This menu item could not be found. Please refresh the page.');
  return item;
}

/** Re-checks the values (the service never trusts the screen). Returns the cleaned values. */
function validateOrThrow(input, editingId = null) {
  const { errors, values } = validateMenuItemInput(input, {
    categoryIds: menu.categories.map((category) => category.id),
    otherItems: activeItems().filter((item) => item.id !== editingId),
  });
  const firstError = Object.values(errors)[0];
  if (firstError) throw new Error(firstError);
  return values;
}

/** Re-checks a category name (the service never trusts the screen). Returns the cleaned name. */
function validateCategoryOrThrow(input, editingId = null) {
  const { error, name } = validateCategoryName(input, {
    otherCategories: menu.categories.filter((category) => category.id !== editingId),
  });
  if (error) throw new Error(error);
  return name;
}

/** How many menu items (not removed) are in a category. */
const countActiveItems = (categoryId) => activeItems().filter((item) => item.categoryId === categoryId).length;

/**
 * Looks up one menu item that is still on the menu. Used ONLY by the
 * fake order service so it can take prices from the menu. The real
 * backend will do this itself.
 */
export function findMenuItemById(menuItemId) {
  return activeItems().find((item) => item.id === menuItemId) ?? null;
}

const cafeMenuService = {
  /** All categories (e.g. Fresh Juices, Smoothies). */
  async getCategories() {
    await wait();
    return copy(menu.categories);
  },

  /** Admin adds a new category. */
  async createCategory(input) {
    await wait();
    const name = validateCategoryOrThrow(input);
    lastCategoryNumber += 1;
    const category = { id: `c${lastCategoryNumber}`, name };
    menu.categories.push(category);
    return copy(category);
  },

  /** Admin renames a category. Items keep belonging to it. */
  async updateCategory(categoryId, input) {
    await wait();
    const category = menu.categories.find((c) => c.id === categoryId);
    if (!category) throw new Error('This category could not be found. Please refresh the page.');
    category.name = validateCategoryOrThrow(input, categoryId);
    return copy(category);
  },

  /** Admin removes a category - only allowed when no menu items are in it. */
  async removeCategory(categoryId) {
    await wait();
    const category = menu.categories.find((c) => c.id === categoryId);
    if (!category) throw new Error('This category could not be found. Please refresh the page.');
    const count = countActiveItems(categoryId);
    if (count > 0) {
      throw new Error(
        `"${category.name}" still has ${count} menu ${count === 1 ? 'item' : 'items'}. Move or remove ${count === 1 ? 'it' : 'them'} first.`
      );
    }
    menu.categories = menu.categories.filter((c) => c.id !== categoryId);
    return { id: categoryId };
  },

  /** All menu items that are on the menu, including unavailable ones (shown greyed out). */
  async getMenuItems() {
    await wait();
    return copy(activeItems());
  },

  /** Admin adds a new menu item. */
  async createMenuItem(input) {
    await wait();
    const values = validateOrThrow(input);
    const item = { id: `m${highestNumber(menu.items) + 1}`, ...values, isRemoved: false };
    menu.items.push(item);
    return copy(item);
  },

  /** Admin changes the details of a menu item. */
  async updateMenuItem(menuItemId, input) {
    await wait();
    const item = findActiveItem(menuItemId);
    Object.assign(item, validateOrThrow(input, menuItemId));
    return copy(item);
  },

  /** Admin marks an item available or unavailable. */
  async setItemAvailability(menuItemId, isAvailable) {
    await wait();
    const item = findActiveItem(menuItemId);
    item.isAvailable = Boolean(isAvailable);
    return copy(item);
  },

  /** Admin removes an item from the menu (hidden, not erased). */
  async removeMenuItem(menuItemId) {
    await wait();
    findActiveItem(menuItemId).isRemoved = true;
    return { id: menuItemId };
  },

  /** For automated tests only: puts the fake data back to its start. */
  resetMockData() {
    menu = createMockMenu();
    lastCategoryNumber = highestNumber(menu.categories);
  },
};

export default cafeMenuService;
