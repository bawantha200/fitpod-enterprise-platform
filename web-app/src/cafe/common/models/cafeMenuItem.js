/**
 * cafeMenuItem.js  (Model layer)
 * ------------------------------------------------------------------
 * The rules for a cafe menu item, written once and used by BOTH the
 * Admin form (to show errors while typing) and the service (to double
 * check before saving). No React and no API calls here.
 *
 * Menu item shape:
 *   { id, name, categoryId, price (whole Rs.), sizeMl, description,
 *     isAvailable, isRemoved }
 * ------------------------------------------------------------------
 */

export const MENU_ITEM_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 40,
  DESCRIPTION_MAX: 150,
  PRICE_MAX: 100000,
  SIZE_ML_MAX: 2000,
};

/** "650" -> 650. Anything that is not plain digits -> NaN (so it is rejected). */
function toWholeNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  const text = value.trim();
  return /^\d+$/.test(text) ? Number(text) : NaN;
}

/**
 * Checks the values of the add / edit form.
 *   input   - what the form holds (numbers may still be text like "650")
 *   context - { categoryIds: ids that exist,
 *               otherItems: the other menu items (not removed, not this one),
 *                           used to stop two items having the same name }
 * Returns { errors, values }:
 *   errors - an object like { name: 'message' }, empty when everything is fine
 *   values - the cleaned values (trimmed text, real numbers), ready to save
 */
export function validateMenuItemInput(input, { categoryIds, otherItems }) {
  const limits = MENU_ITEM_LIMITS;
  const errors = {};

  const name = (input.name ?? '').trim();
  const description = (input.description ?? '').trim();
  const price = toWholeNumber(input.price);
  const sizeMl = toWholeNumber(input.sizeMl);

  if (!name) {
    errors.name = 'Enter the item name.';
  } else if (name.length < limits.NAME_MIN || name.length > limits.NAME_MAX) {
    errors.name = `The name must be ${limits.NAME_MIN} to ${limits.NAME_MAX} characters.`;
  } else if (otherItems.some((item) => item.name.trim().toLowerCase() === name.toLowerCase())) {
    errors.name = 'Another menu item already has this name.';
  }

  if (!categoryIds.includes(input.categoryId)) {
    errors.categoryId = 'Choose a category.';
  }

  if (!Number.isInteger(price) || price < 1 || price > limits.PRICE_MAX) {
    errors.price = 'Enter the price as a whole number of rupees, from 1 to 100,000.';
  }

  if (!Number.isInteger(sizeMl) || sizeMl < 1 || sizeMl > limits.SIZE_ML_MAX) {
    errors.sizeMl = 'Enter the size in ml as a whole number, from 1 to 2,000.';
  }

  if (description.length > limits.DESCRIPTION_MAX) {
    errors.description = `The description can be at most ${limits.DESCRIPTION_MAX} characters.`;
  }

  return {
    errors,
    values: {
      name,
      categoryId: input.categoryId,
      price,
      sizeMl,
      description,
      isAvailable: Boolean(input.isAvailable),
    },
  };
}
