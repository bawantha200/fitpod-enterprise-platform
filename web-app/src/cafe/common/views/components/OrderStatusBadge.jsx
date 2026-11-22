/**
 * OrderStatusBadge.jsx  (View component, shared by Admin and Staff)
 * A small coloured pill showing an order's status.
 */
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '../../models/cafeOrder';

// Full class names are written out so Tailwind can find them.
const STATUS_STYLES = {
  [ORDER_STATUS.PENDING]: 'bg-[#ffde59]/15 text-[#ffde59]',
  [ORDER_STATUS.ACCEPTED]: 'bg-white/10 text-white',
  [ORDER_STATUS.PREPARING]: 'bg-[#ff9f43]/15 text-[#ff9f43]',
  [ORDER_STATUS.READY]: 'bg-[#b6ff00]/15 text-[#b6ff00]',
  [ORDER_STATUS.COMPLETED]: 'bg-white/10 text-[#a0a0a0]',
  [ORDER_STATUS.REJECTED]: 'bg-[#ff6b6b]/15 text-[#ff6b6b]',
  [ORDER_STATUS.CANCELLED]: 'bg-[#ff6b6b]/15 text-[#ff6b6b]',
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? 'bg-white/10 text-white'}`}
    >
      {ORDER_STATUS_LABELS[status] ?? status}
    </span>
  );
}
