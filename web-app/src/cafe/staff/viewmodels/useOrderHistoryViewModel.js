/**
 * useOrderHistoryViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Order History page:
 *   - loads the finished orders (completed, rejected, cancelled)
 *   - status filter, order-type filter (mobile / walk-in) and search
 *   - which order's details panel is open
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeOrderService from '../../common/services/cafeOrderService';
import { FINISHED_STATUSES, ORDER_STATUS, orderMatchesSearch } from '../../common/models/cafeOrder';
import { ORDER_SOURCE_FILTERS } from '../../common/constants/cafeOrderFilters';

export const HISTORY_STATUS_FILTERS = [
  { key: 'all', label: 'All finished', statuses: FINISHED_STATUSES },
  { key: 'completed', label: 'Completed', statuses: [ORDER_STATUS.COMPLETED] },
  { key: 'rejected', label: 'Rejected', statuses: [ORDER_STATUS.REJECTED] },
  { key: 'cancelled', label: 'Cancelled', statuses: [ORDER_STATUS.CANCELLED] },
];

export default function useOrderHistoryViewModel() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [statusFilterKey, setStatusFilterKey] = useState('all');
  const [sourceFilterKey, setSourceFilterKey] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // ---- Loading -------------------------------------------------
  useEffect(() => {
    let cancelled = false; // ignore the answer if the page was closed meanwhile
    cafeOrderService
      .getOrderHistory()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message || 'Could not load the order history.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Used by the Refresh / Try again buttons.
  const reload = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      setOrders(await cafeOrderService.getOrderHistory());
    } catch (error) {
      setLoadError(error.message || 'Could not load the order history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Filters -------------------------------------------------
  const hasActiveFilters = statusFilterKey !== 'all' || sourceFilterKey !== 'all' || searchText.trim() !== '';

  const resetFilters = () => {
    setStatusFilterKey('all');
    setSourceFilterKey('all');
    setSearchText('');
  };

  const visibleOrders = useMemo(() => {
    const statusFilter = HISTORY_STATUS_FILTERS.find((f) => f.key === statusFilterKey) ?? HISTORY_STATUS_FILTERS[0];
    const sourceFilter = ORDER_SOURCE_FILTERS.find((f) => f.key === sourceFilterKey) ?? ORDER_SOURCE_FILTERS[0];

    return orders.filter(
      (order) =>
        statusFilter.statuses.includes(order.status) &&
        (sourceFilter.source === null || order.source === sourceFilter.source) &&
        orderMatchesSearch(order, searchText)
    );
  }, [orders, statusFilterKey, sourceFilterKey, searchText]);

  // ---- Details panel -------------------------------------------
  const openDetails = (order) => setSelectedOrderId(order.id);
  const closeDetails = useCallback(() => setSelectedOrderId(null), []);

  return {
    // data
    visibleOrders,
    totalCount: orders.length,
    selectedOrder: orders.find((o) => o.id === selectedOrderId) ?? null,
    // state
    isLoading,
    loadError,
    statusFilterKey,
    sourceFilterKey,
    searchText,
    hasActiveFilters,
    // actions
    setStatusFilterKey,
    setSourceFilterKey,
    setSearchText,
    resetFilters,
    reload,
    openDetails,
    closeDetails,
  };
}
