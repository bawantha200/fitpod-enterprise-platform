/**
 * StaffOrderHistoryPage.jsx  (View)
 * ------------------------------------------------------------------
 * Cafe Staff: finished orders (completed, rejected, cancelled).
 * Covers the use cases: View Walk-in Orders (use the "Walk-in orders"
 * filter), View Order Status History and View Order Details (the
 * details panel shows the full timeline).
 * All logic is in useOrderHistoryViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { RefreshCw, Search } from 'lucide-react';
import useOrderHistoryViewModel, {
  HISTORY_SOURCE_FILTERS,
  HISTORY_STATUS_FILTERS,
} from '../../viewmodels/useOrderHistoryViewModel';
import FilterChip from '../../../common/views/components/FilterChip';
import OrderDetailsPanel from '../../../common/views/components/OrderDetailsPanel';
import OrderStatusBadge from '../../../common/views/components/OrderStatusBadge';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { ORDER_SOURCE_LABELS, getLastUpdated } from '../../../common/models/cafeOrder';
import { formatCurrency, formatDateTime } from '../../../common/utils/formatters';

export default function StaffOrderHistoryPage() {
  const vm = useOrderHistoryViewModel();
  const cellClass = 'px-4 py-3 align-middle';

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>Order History</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Finished orders, most recently updated first.</p>
        </div>
        <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
          <RefreshCw size={16} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* Search and filters */}
      <div className="relative mt-6 max-w-md">
        <label htmlFor="history-search" className="sr-only">
          Search by order number or customer name
        </label>
        <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]" />
        <input
          id="history-search"
          type="search"
          value={vm.searchText}
          onChange={(event) => vm.setSearchText(event.target.value)}
          placeholder="Search by order number or customer"
          className={`${cafeTheme.input} pl-9`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {HISTORY_STATUS_FILTERS.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            isActive={vm.statusFilterKey === filter.key}
            onClick={() => vm.setStatusFilterKey(filter.key)}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by order type">
        {HISTORY_SOURCE_FILTERS.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            isActive={vm.sourceFilterKey === filter.key}
            onClick={() => vm.setSourceFilterKey(filter.key)}
          />
        ))}
      </div>

      {/* Results */}
      <div className="mt-6">
        {vm.isLoading ? (
          <p className={cafeTheme.muted}>Loading order history...</p>
        ) : vm.loadError ? (
          <div className={`${cafeTheme.card} max-w-md p-6`}>
            <p role="alert" className="text-sm text-[#ff6b6b]">{vm.loadError}</p>
            <button type="button" className={`${cafeTheme.buttonPrimary} mt-4`} onClick={vm.reload}>
              Try again
            </button>
          </div>
        ) : vm.visibleOrders.length === 0 ? (
          <div>
            <p className={cafeTheme.muted}>
              {vm.hasActiveFilters ? 'No orders match your search or filters.' : 'No finished orders yet.'}
            </p>
            {vm.hasActiveFilters && (
              <button type="button" className={`${cafeTheme.buttonGhost} mt-3`} onClick={vm.resetFilters}>
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className={`${cafeTheme.muted} mb-3`} aria-live="polite">
              Showing {vm.visibleOrders.length} of {vm.totalCount} orders
            </p>
            <div className={`${cafeTheme.card} overflow-x-auto`}>
              <table className="w-full min-w-[56rem] text-left text-sm">
                <caption className="sr-only">Finished cafe orders</caption>
                <thead className="border-b border-[#303030] text-xs uppercase text-[#a0a0a0]">
                  <tr>
                    <th scope="col" className={cellClass}>Order</th>
                    <th scope="col" className={cellClass}>Customer</th>
                    <th scope="col" className={cellClass}>Type</th>
                    <th scope="col" className={cellClass}>Items</th>
                    <th scope="col" className={cellClass}>Total</th>
                    <th scope="col" className={cellClass}>Status</th>
                    <th scope="col" className={cellClass}>Last updated</th>
                    <th scope="col" className={cellClass}><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {vm.visibleOrders.map((order) => {
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
                        <td className={`${cellClass} whitespace-nowrap text-[#a0a0a0]`}>{formatDateTime(getLastUpdated(order))}</td>
                        <td className={`${cellClass} text-right`}>
                          <button
                            type="button"
                            className={cafeTheme.buttonGhost}
                            aria-label={`View details of order ${order.orderNumber}`}
                            onClick={() => vm.openDetails(order)}
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
          </>
        )}
      </div>

      {vm.selectedOrder && <OrderDetailsPanel order={vm.selectedOrder} onClose={vm.closeDetails} />}
    </section>
  );
}
