/**
 * cafeNavigation.js
 * ------------------------------------------------------------------
 * Sidebar menu for each role. Adding a new page to the sidebar means
 * adding one line here (plus its route in CafeRoutes.jsx).
 * `icon` is the name of a lucide-react icon, resolved in CafeSidebar.
 * ------------------------------------------------------------------
 */
import { CAFE_ROLES, CAFE_BASE_PATH } from './cafeRoles';

export const CAFE_NAVIGATION = {
  [CAFE_ROLES.ADMIN]: [
    { label: 'Menu Items', path: `${CAFE_BASE_PATH}/admin/menu`, icon: 'UtensilsCrossed' },
    { label: 'Categories', path: `${CAFE_BASE_PATH}/admin/categories`, icon: 'Tags' },
    { label: 'All Orders', path: `${CAFE_BASE_PATH}/admin/orders`, icon: 'ClipboardList' },
    { label: 'Reports', path: `${CAFE_BASE_PATH}/admin/reports`, icon: 'TrendingUp' },
  ],
  [CAFE_ROLES.STAFF]: [
    { label: 'Incoming Orders', path: `${CAFE_BASE_PATH}/staff/orders`, icon: 'BellRing' },
    { label: 'Walk-in Order', path: `${CAFE_BASE_PATH}/staff/walk-in`, icon: 'ShoppingBag' },
    { label: 'Order History', path: `${CAFE_BASE_PATH}/staff/history`, icon: 'History' },
  ],
};
