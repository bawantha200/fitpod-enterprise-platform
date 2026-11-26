/**
 * useAllOrdersViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Admin "All Orders" page (view-only):
 *   - loads every order, newest first
 *   - the summary numbers at the top
 *   - status filter, order-type filter and search
 *   - which order's details panel is open
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeOrderService from '../../common/services/cafeOrderService';
import {
  ACTIVE_STATUSES,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  orderMatchesSearch,
} from '../../common/models/cafeOrder';
import { ORDER_SOURCE_FILTERS } from '../../common/constants/cafeOrderFilters';

/** "All statuses" plus one filter per status (New, Accepted, ... Cancelled). */
export const ORDER_STATUS_FILTERS = [
  { key: 'all', label: 'All statuses', status: null },
  ...Object.values(ORDER_STATUS).map((status) => ({ key: status, label: ORDER_STATUS_LABELS[status], status })),
];

export default function useAllOrdersViewModel() {
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
      .getAllOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message || 'Could not load the orders.');
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
      setOrders(await cafeOrderService.getAllOrders());
    } catch (error) {
      setLoadError(error.message || 'Could not load the orders.');
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
    const statusFilter = ORDER_STATUS_FILTERS.find((f) => f.key === statusFilterKey) ?? ORDER_STATUS_FILTERS[0];
    const sourceFilter = ORDER_SOURCE_FILTERS.find((f) => f.key === sourceFilterKey) ?? ORDER_SOURCE_FILTERS[0];

    return orders.filter(
      (order) =>
        (statusFilter.status === null || order.status === statusFilter.status) &&
        (sourceFilter.source === null || order.source === sourceFilter.source) &&
        orderMatchesSearch(order, searchText)
    );
  }, [orders, statusFilterKey, sourceFilterKey, searchText]);

  // The four numbers at the top (always over ALL orders, not the filtered ones).
  const summary = useMemo(
    () => ({
      total: orders.length,
      inProgress: orders.filter((o) => ACTIVE_STATUSES.includes(o.status)).length,
      completed: orders.filter((o) => o.status === ORDER_STATUS.COMPLETED).length,
      notFulfilled: orders.filter((o) => o.status === ORDER_STATUS.REJECTED || o.status === ORDER_STATUS.CANCELLED).length,
    }),
    [orders]
  );

  // ---- Details panel -------------------------------------------
  const openDetails = (order) => setSelectedOrderId(order.id);
  const closeDetails = useCallback(() => setSelectedOrderId(null), []);

  return {
    // data
    visibleOrders,
    summary,
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
