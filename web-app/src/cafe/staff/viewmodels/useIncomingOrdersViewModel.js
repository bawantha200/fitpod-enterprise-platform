/**
 * useIncomingOrdersViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Incoming Orders page lives here, so the page
 * file only has to draw things:
 *   - loads the orders from the service
 *   - filter tabs and their counts
 *   - accept / reject / move-forward actions
 *   - which order's details or reject dialog is open
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeOrderService from '../../common/services/cafeOrderService';
import {
  ACTIVE_STATUSES,
  FORWARD_STEPS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from '../../common/models/cafeOrder';

/** Filter tabs shown above the orders. */
export const ORDER_FILTERS = [
  { key: 'all', label: 'All active', statuses: ACTIVE_STATUSES },
  { key: 'pending', label: 'New', statuses: [ORDER_STATUS.PENDING] },
  { key: 'accepted', label: 'Accepted', statuses: [ORDER_STATUS.ACCEPTED] },
  { key: 'preparing', label: 'Preparing', statuses: [ORDER_STATUS.PREPARING] },
  { key: 'ready', label: 'Ready', statuses: [ORDER_STATUS.READY] },
];

export default function useIncomingOrdersViewModel() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyOrderId, setBusyOrderId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [rejectingOrderId, setRejectingOrderId] = useState(null);

  // ---- Loading -------------------------------------------------
  // First load when the page opens.
  useEffect(() => {
    let cancelled = false; // ignore the answer if the page was closed meanwhile
    cafeOrderService
      .getIncomingOrders()
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
      setOrders(await cafeOrderService.getIncomingOrders());
    } catch (error) {
      setLoadError(error.message || 'Could not load the orders.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Actions -------------------------------------------------
  /** Puts an updated order into the list (or removes it if it is no longer "incoming"). */
  const applyUpdatedOrder = (updated) => {
    setOrders((previous) =>
      ACTIVE_STATUSES.includes(updated.status)
        ? previous.map((o) => (o.id === updated.id ? updated : o))
        : previous.filter((o) => o.id !== updated.id)
    );
  };

  /** Runs one service call with busy / error / success-message handling. */
  const runAction = async (orderId, serviceCall, successMessage) => {
    setBusyOrderId(orderId);
    setActionError('');
    setNotice('');
    try {
      applyUpdatedOrder(await serviceCall());
      setNotice(successMessage);
      return true;
    } catch (error) {
      setActionError(error.message || 'Something went wrong. Please try again.');
      return false;
    } finally {
      setBusyOrderId(null);
    }
  };

  const acceptOrder = (order) =>
    runAction(order.id, () => cafeOrderService.acceptOrder(order.id), `Order #${order.orderNumber} accepted.`);

  /** Moves an accepted order to its next step (preparing, ready, completed). */
  const advanceOrder = (order) => {
    const step = FORWARD_STEPS[order.status];
    if (!step) return Promise.resolve(false);
    return runAction(
      order.id,
      () => cafeOrderService.updateOrderStatus(order.id, step.to),
      `Order #${order.orderNumber} marked as ${ORDER_STATUS_LABELS[step.to].toLowerCase()}.`
    );
  };

  // Reject is two steps: open the dialog, then confirm with a reason.
  const startReject = (order) => {
    setActionError('');
    setRejectingOrderId(order.id);
  };
  const cancelReject = useCallback(() => {
    setRejectingOrderId(null);
    setActionError('');
  }, []);
  const confirmReject = async (reason) => {
    const order = orders.find((o) => o.id === rejectingOrderId);
    if (!order) return false;
    const ok = await runAction(
      order.id,
      () => cafeOrderService.rejectOrder(order.id, reason),
      `Order #${order.orderNumber} rejected.`
    );
    if (ok) setRejectingOrderId(null);
    return ok;
  };

  // Details panel
  const openDetails = (order) => setSelectedOrderId(order.id);
  const closeDetails = useCallback(() => setSelectedOrderId(null), []);

  // ---- Values the page displays -------------------------------
  const filters = useMemo(
    () =>
      ORDER_FILTERS.map((filter) => ({
        key: filter.key,
        label: filter.label,
        count: orders.filter((o) => filter.statuses.includes(o.status)).length,
      })),
    [orders]
  );

  const visibleOrders = useMemo(() => {
    const filter = ORDER_FILTERS.find((f) => f.key === activeFilter) ?? ORDER_FILTERS[0];
    return orders.filter((o) => filter.statuses.includes(o.status));
  }, [orders, activeFilter]);

  return {
    // data
    visibleOrders,
    filters,
    activeFilter,
    selectedOrder: orders.find((o) => o.id === selectedOrderId) ?? null,
    rejectingOrder: orders.find((o) => o.id === rejectingOrderId) ?? null,
    // state
    isLoading,
    loadError,
    actionError,
    notice,
    busyOrderId,
    // actions
    setActiveFilter,
    reload,
    acceptOrder,
    advanceOrder,
    startReject,
    cancelReject,
    confirmReject,
    openDetails,
    closeDetails,
  };
}
