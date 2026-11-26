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
import useOrderHistoryViewModel, { HISTORY_STATUS_FILTERS } from '../../viewmodels/useOrderHistoryViewModel';
import FilterChip from '../../../common/views/components/FilterChip';
import OrderDetailsPanel from '../../../common/views/components/OrderDetailsPanel';
import OrdersTable from '../../../common/views/components/OrdersTable';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { ORDER_SOURCE_FILTERS } from '../../../common/constants/cafeOrderFilters';
import { getLastUpdated } from '../../../common/models/cafeOrder';

export default function StaffOrderHistoryPage() {
  const vm = useOrderHistoryViewModel();

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
        {ORDER_SOURCE_FILTERS.map((filter) => (
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
            <OrdersTable
              orders={vm.visibleOrders}
              caption="Finished cafe orders"
              dateLabel="Last updated"
              getDate={getLastUpdated}
              onViewDetails={vm.openDetails}
            />
          </>
        )}
      </div>

      {vm.selectedOrder && <OrderDetailsPanel order={vm.selectedOrder} onClose={vm.closeDetails} />}
    </section>
  );
}
