/**
 * OrdersTable.jsx  (View component, shared by Admin and Staff)
 * A table of orders with a "View details" button on every row.
 * The last date column differs per page, so the page says what to
 * show: `dateLabel` is the column title and `getDate(order)` returns
 * the date (e.g. "Placed" for Admin, "Last updated" for Order History).
 */
import OrderStatusBadge from './OrderStatusBadge';
import { cafeTheme } from '../../constants/cafeTheme';
import { ORDER_SOURCE_LABELS } from '../../models/cafeOrder';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export default function OrdersTable({ orders, caption, dateLabel, getDate, onViewDetails }) {
  const cellClass = 'px-4 py-3 align-middle';

  return (
    <div className={`${cafeTheme.card} overflow-x-auto`}>
      <table className="w-full min-w-[56rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-[#303030] text-xs uppercase text-[#a0a0a0]">
          <tr>
            <th scope="col" className={cellClass}>Order</th>
            <th scope="col" className={cellClass}>Customer</th>
            <th scope="col" className={cellClass}>Type</th>
            <th scope="col" className={cellClass}>Items</th>
            <th scope="col" className={cellClass}>Total</th>
            <th scope="col" className={cellClass}>Status</th>
            <th scope="col" className={cellClass}>{dateLabel}</th>
            <th scope="col" className={cellClass}><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const itemsText = order.items.map((item) => `${item.quantity} × ${item.name}`).join(', ');
            return (
              <tr key={order.id} className="border-b border-[#303030] last:border-0">
                <th scope="row" className={`${cellClass} font-semibold`}>#{order.orderNumber}</th>
                <td className={cellClass}>{order.customerName}</td>
                <td className={`${cellClass} text-[#a0a0a0]`}>{ORDER_SOURCE_LABELS[order.source]}</td>
                <td className={`${cellClass} max-w-[16rem] truncate text-[#a0a0a0]`} title={itemsText}>
                  {itemsText}
                </td>
                <td className={cellClass}>{formatCurrency(order.total)}</td>
                <td className={cellClass}><OrderStatusBadge status={order.status} /></td>
                <td className={`${cellClass} whitespace-nowrap text-[#a0a0a0]`}>{formatDateTime(getDate(order))}</td>
                <td className={`${cellClass} text-right`}>
                  <button
                    type="button"
                    className={cafeTheme.buttonGhost}
                    aria-label={`View details of order ${order.orderNumber}`}
                    onClick={() => onViewDetails(order)}
                  >
                    View details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
