/**
 * OrderDetailsPanel.jsx  (View component)
 * Slide-in panel on the right showing everything about one order:
 * items, notes, total and the full status history (timeline).
 * Read-only - the action buttons stay on the order cards.
 */
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import OrderStatusBadge from '../../../common/views/components/OrderStatusBadge';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { ORDER_SOURCE_LABELS, ORDER_STATUS_LABELS } from '../../../common/models/cafeOrder';
import { formatClockTime, formatCurrency } from '../../../common/utils/formatters';

export default function OrderDetailsPanel({ order, onClose }) {
  const closeButtonRef = useRef(null);

  // Move keyboard focus into the panel when it opens.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        className="relative h-full w-full max-w-md overflow-y-auto border-l border-[#303030] bg-[#0a0a0a] p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="details-title" className="text-xl font-bold">
              Order #{order.orderNumber}
            </h2>
            <p className={cafeTheme.muted}>
              {ORDER_SOURCE_LABELS[order.source]} for {order.customerName}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-lg border border-[#303030] p-2 hover:border-[#b6ff00]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-3">
          <OrderStatusBadge status={order.status} />
        </div>

        <h3 className="mt-6 text-sm font-semibold">Items</h3>
        <ul className={`${cafeTheme.card} mt-2 divide-y divide-[#303030]`}>
          {order.items.map((item) => (
            <li key={item.menuItemId} className="flex justify-between gap-3 p-3 text-sm">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
          <li className="flex justify-between p-3 text-sm font-bold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </li>
        </ul>

        {order.notes && (
          <>
            <h3 className="mt-6 text-sm font-semibold">Customer note</h3>
            <p className={`${cafeTheme.muted} mt-1`}>{order.notes}</p>
          </>
        )}

        {order.rejectionReason && (
          <>
            <h3 className="mt-6 text-sm font-semibold text-[#ff6b6b]">Rejection reason</h3>
            <p className={`${cafeTheme.muted} mt-1`}>{order.rejectionReason}</p>
          </>
        )}

        <h3 className="mt-6 text-sm font-semibold">Status history</h3>
        <ol className="mt-2 space-y-3 border-l border-[#303030] pl-4">
          {order.statusHistory.map((entry, index) => (
            <li key={`${entry.status}-${index}`} className="text-sm">
              <p className="font-medium">{ORDER_STATUS_LABELS[entry.status]}</p>
              <p className="text-xs text-[#a0a0a0]">{formatClockTime(entry.at)}</p>
              {entry.note && <p className="text-xs text-[#a0a0a0]">{entry.note}</p>}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
