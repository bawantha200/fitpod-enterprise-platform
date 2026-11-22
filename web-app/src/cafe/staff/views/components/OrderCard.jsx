/**
 * OrderCard.jsx  (View component)
 * One incoming order as a card, with the buttons that are allowed
 * for its current status:
 *   New       -> Accept / Reject
 *   Accepted  -> Start preparing
 *   Preparing -> Mark as ready
 *   Ready     -> Mark as completed
 */
import OrderStatusBadge from '../../../common/views/components/OrderStatusBadge';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { FORWARD_STEPS, ORDER_SOURCE_LABELS, ORDER_STATUS } from '../../../common/models/cafeOrder';
import { formatCurrency, formatTimeAgo } from '../../../common/utils/formatters';

export default function OrderCard({ order, isBusy, onAccept, onReject, onAdvance, onViewDetails }) {
  const forwardStep = FORWARD_STEPS[order.status];

  return (
    <article className={`${cafeTheme.card} flex flex-col gap-4 p-5`} aria-label={`Order ${order.orderNumber}`}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Order #{order.orderNumber}</h2>
          <p className={cafeTheme.muted}>
            {ORDER_SOURCE_LABELS[order.source]}, {formatTimeAgo(order.createdAt)}
          </p>
          <p className="mt-1 text-sm">{order.customerName}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </header>

      <ul className="space-y-1 border-y border-[#303030] py-3 text-sm">
        {order.items.map((item) => (
          <li key={item.menuItemId} className="flex justify-between gap-3">
            <span>
              {item.quantity} × {item.name}
            </span>
            <span className="text-[#a0a0a0]">{formatCurrency(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className="rounded-lg bg-[#0a0a0a] p-3 text-sm text-[#a0a0a0]">Note: {order.notes}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-[#a0a0a0]">Total</span>
        <span className="text-lg font-bold">{formatCurrency(order.total)}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {order.status === ORDER_STATUS.PENDING && (
          <>
            <button type="button" className={cafeTheme.buttonPrimary} disabled={isBusy} onClick={() => onAccept(order)}>
              Accept
            </button>
            <button type="button" className={cafeTheme.buttonDanger} disabled={isBusy} onClick={() => onReject(order)}>
              Reject
            </button>
          </>
        )}
        {forwardStep && (
          <button type="button" className={cafeTheme.buttonPrimary} disabled={isBusy} onClick={() => onAdvance(order)}>
            {forwardStep.label}
          </button>
        )}
        <button type="button" className={cafeTheme.buttonGhost} onClick={() => onViewDetails(order)}>
          View details
        </button>
      </div>
    </article>
  );
}
