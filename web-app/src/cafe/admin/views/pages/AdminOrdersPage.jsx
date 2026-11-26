/**
 * AdminOrdersPage.jsx  (View)
 * ------------------------------------------------------------------
 * Administrator: every cafe order, in any status (VIEW ONLY - staff
 * are the ones who accept orders and move them along).
 * Covers the use cases: Manage All Cafe Orders, Search Cafe Orders,
 * Filter Orders and View Order Summary (summary numbers at the top
 * and the details panel for one order).
 * All logic is in useAllOrdersViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { RefreshCw, Search } from 'lucide-react';
import useAllOrdersViewModel, { ORDER_STATUS_FILTERS } from '../../viewmodels/useAllOrdersViewModel';
import FilterChip from '../../../common/views/components/FilterChip';
import OrderDetailsPanel from '../../../common/views/components/OrderDetailsPanel';
import OrdersTable from '../../../common/views/components/OrdersTable';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { ORDER_SOURCE_FILTERS } from '../../../common/constants/cafeOrderFilters';

export default function AdminOrdersPage() {
  const vm = useAllOrdersViewModel();

  const summaryCards = [
    { label: 'All orders', value: vm.summary.total },
    { label: 'In progress', value: vm.summary.inProgress },
    { label: 'Completed', value: vm.summary.completed },
    { label: 'Rejected or cancelled', value: vm.summary.notFulfilled },
  ];

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>All Orders</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Every cafe order, newest first. Cafe staff update the order statuses.</p>
        </div>
        <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
          <RefreshCw size={16} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* Summary numbers */}
      {!vm.isLoading && !vm.loadError && (
        <dl aria-label="Order summary" className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.label} className={`${cafeTheme.card} p-4`}>
              <dt className="text-xs text-[#a0a0a0]">{card.label}</dt>
              <dd className="mt-1 text-2xl font-bold">{card.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Search and filters */}
      <div className="relative mt-6 max-w-md">
        <label htmlFor="orders-search" className="sr-only">
          Search by order number or customer name
        </label>
        <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]" />
        <input
          id="orders-search"
          type="search"
          value={vm.searchText}
          onChange={(event) => vm.setSearchText(event.target.value)}
          placeholder="Search by order number or customer"
          className={`${cafeTheme.input} pl-9`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {ORDER_STATUS_FILTERS.map((filter) => (
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
          <p className={cafeTheme.muted}>Loading orders...</p>
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
              {vm.hasActiveFilters ? 'No orders match your search or filters.' : 'There are no orders yet.'}
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
              caption="All cafe orders"
              dateLabel="Placed"
              getDate={(order) => order.createdAt}
              onViewDetails={vm.openDetails}
            />
          </>
        )}
      </div>

      {vm.selectedOrder && <OrderDetailsPanel order={vm.selectedOrder} onClose={vm.closeDetails} />}
    </section>
  );
}
