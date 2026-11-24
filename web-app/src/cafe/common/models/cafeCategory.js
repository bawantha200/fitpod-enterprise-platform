/**
 * cafeCategory.js  (Model layer)
 * ------------------------------------------------------------------
 * The rules for a menu category (e.g. "Fresh Juices"), written once
 * and used by BOTH the Admin form and the service.
 *
 * Category shape: { id, name }
 * ------------------------------------------------------------------
 */

export const CATEGORY_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 30,
};

/**
 * Checks a category name.
 *   otherCategories - the OTHER categories (not the one being renamed),
 *                     used to stop two categories having the same name.
 * Returns { error, name }: `error` is '' when the name is fine and
 * `name` is the cleaned (trimmed) name.
 */
export function validateCategoryName(input, { otherCategories }) {
  const name = (input ?? '').trim();
  let error = '';

  if (!name) {
    error = 'Enter the category name.';
  } else if (name.length < CATEGORY_LIMITS.NAME_MIN || name.length > CATEGORY_LIMITS.NAME_MAX) {
    error = `The name must be ${CATEGORY_LIMITS.NAME_MIN} to ${CATEGORY_LIMITS.NAME_MAX} characters.`;
  } else if (otherCategories.some((category) => category.name.trim().toLowerCase() === name.toLowerCase())) {
    error = 'Another category already has this name.';
  }

  return { error, name };
}
