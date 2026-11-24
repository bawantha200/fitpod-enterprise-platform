/**
 * StaffIncomingOrdersPage.jsx  (View)
 * ------------------------------------------------------------------
 * Cafe Staff: the live queue of orders that still need work.
 * Covers the use cases: View Incoming Orders, Accept / Reject Order,
 * Update Order Status (Preparing, Ready, Completed) and View Order
 * Details. All logic is in useIncomingOrdersViewModel - this file
 * only draws the screen.
 * ------------------------------------------------------------------
 */
import { RefreshCw } from 'lucide-react';
import useIncomingOrdersViewModel from '../../viewmodels/useIncomingOrdersViewModel';
import OrderCard from '../components/OrderCard';
import OrderDetailsPanel from '../../../common/views/components/OrderDetailsPanel';
import RejectOrderDialog from '../components/RejectOrderDialog';
import { cafeTheme } from '../../../common/constants/cafeTheme';

export default function StaffIncomingOrdersPage() {
  const vm = useIncomingOrdersViewModel();

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>Incoming Orders</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Oldest orders first. Accept new orders and move them along.</p>
        </div>
        <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
          <RefreshCw size={16} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter orders by status">
        {vm.filters.map((filter) => {
          const isActive = vm.activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => vm.setActiveFilter(filter.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00] ${
                isActive
                  ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
                  : 'border-[#303030] text-[#a0a0a0] hover:border-[#b6ff00] hover:text-white'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          );
        })}
      </div>

      {/* Messages */}
      {vm.notice && (
        <p role="status" className="mt-4 rounded-lg border border-[#b6ff00]/40 bg-[#b6ff00]/10 p-3 text-sm text-[#b6ff00]">
          {vm.notice}
        </p>
      )}
      {vm.actionError && !vm.rejectingOrder && (
        <p role="alert" className="mt-4 rounded-lg border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 p-3 text-sm text-[#ff6b6b]">
          {vm.actionError}
        </p>
      )}

      {/* Orders */}
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
          <p className={cafeTheme.muted}>No orders here right now.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {vm.visibleOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isBusy={vm.busyOrderId === order.id}
                onAccept={vm.acceptOrder}
                onReject={vm.startReject}
                onAdvance={vm.advanceOrder}
                onViewDetails={vm.openDetails}
              />
            ))}
          </div>
        )}
      </div>

      {vm.selectedOrder && <OrderDetailsPanel order={vm.selectedOrder} onClose={vm.closeDetails} />}
      {vm.rejectingOrder && (
        <RejectOrderDialog
          order={vm.rejectingOrder}
          isBusy={vm.busyOrderId === vm.rejectingOrder.id}
          error={vm.actionError}
          onConfirm={vm.confirmReject}
          onCancel={vm.cancelReject}
        />
      )}
    </section>
  );
}
