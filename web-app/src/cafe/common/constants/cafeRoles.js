/**
 * cafeRoles.js
 * ------------------------------------------------------------------
 * The two web-application roles that use the Cafe & Order Management
 * module. The values MUST match what the login module (Module 01)
 * returns in the user object ('admin' / 'cafe_staff').
 * ------------------------------------------------------------------
 */
export const CAFE_ROLES = {
  ADMIN: 'admin',
  STAFF: 'cafe_staff',
};

/** Human-friendly names shown in the UI. */
export const CAFE_ROLE_LABELS = {
  [CAFE_ROLES.ADMIN]: 'Administrator',
  [CAFE_ROLES.STAFF]: 'Cafe Staff',
};

/** Base URL where the whole cafe portal is mounted in App.jsx. */
export const CAFE_BASE_PATH = '/cafe-portal';

/** The first page each role lands on. */
export const CAFE_HOME_PATH = {
  [CAFE_ROLES.ADMIN]: `${CAFE_BASE_PATH}/admin/menu`,
  [CAFE_ROLES.STAFF]: `${CAFE_BASE_PATH}/staff/orders`,
};
