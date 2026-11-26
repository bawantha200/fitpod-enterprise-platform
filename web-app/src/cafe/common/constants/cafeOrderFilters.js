/**
 * cafeOrderFilters.js
 * ------------------------------------------------------------------
 * Filter options shared by every screen that lists orders (Staff
 * Order History and Admin All Orders).
 * ------------------------------------------------------------------
 */
import { ORDER_SOURCE } from '../models/cafeOrder';

/** "Order type" filter: where the order came from. `source: null` means no filter. */
export const ORDER_SOURCE_FILTERS = [
  { key: 'all', label: 'All types', source: null },
  { key: 'mobile', label: 'Mobile pre-orders', source: ORDER_SOURCE.MOBILE },
  { key: 'walk_in', label: 'Walk-in orders', source: ORDER_SOURCE.WALK_IN },
];
