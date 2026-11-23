/**
 * StaffWalkInOrderPage.jsx  (View)
 * ------------------------------------------------------------------
 * Cafe Staff: create an order for a customer at the counter.
 * Covers the use cases: Select Walk-in Order Items, Specify Walk-in
 * Quantities, Add Walk-in Order Notes, Calculate Walk-in Order Total,
 * Review Walk-in Order and Submit Walk-in Order.
 * All logic is in useWalkInOrderViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { Link } from 'react-router-dom';
import { Check, Search } from 'lucide-react';
import useWalkInOrderViewModel, { ALL_CATEGORIES } from '../../viewmodels/useWalkInOrderViewModel';
import WalkInMenuItemCard from '../components/WalkInMenuItemCard';
import WalkInOrderSummary from '../components/WalkInOrderSummary';
import ReviewWalkInOrderDialog from '../components/ReviewWalkInOrderDialog';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { CAFE_HOME_PATH, CAFE_ROLES } from '../../../common/constants/cafeRoles';
import { formatCurrency } from '../../../common/utils/formatters';

/** Shown after an order was submitted successfully. */
function OrderCreatedMessage({ order, onNewOrder }) {
  return (
    <section>
      <h1 className={cafeTheme.title}>Walk-in Order</h1>
      <div className={`${cafeTheme.card} mt-6 max-w-md p-6`} role="status">
        <span className="inline-flex rounded-full bg-[#b6ff00] p-2 text-black">
          <Check size={20} aria-hidden="true" />
        </span>
        <h2 className="mt-3 text-lg font-bold">Order #{order.orderNumber} created</h2>
        <p className={`${cafeTheme.muted} mt-1`}>
          {order.customerName}, total {formatCurrency(order.total)}. It is now in the Incoming Orders list as Accepted.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className={cafeTheme.buttonPrimary} onClick={onNewOrder}>
            Create another order
          </button>
          <Link to={CAFE_HOME_PATH[CAFE_ROLES.STAFF]} className={cafeTheme.buttonGhost}>
            View incoming orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function StaffWalkInOrderPage() {
  const vm = useWalkInOrderViewModel();

  if (vm.createdOrder) {
    return <OrderCreatedMessage order={vm.createdOrder} onNewOrder={vm.startNewOrder} />;
  }

  const categoryTabs = [{ id: ALL_CATEGORIES, name: 'All' }, ...vm.categories];

  return (
    <section>
      <h1 className={cafeTheme.title}>Walk-in Order</h1>
      <p className={`${cafeTheme.muted} mt-1`}>Pick the items, set the quantities, then review and submit.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Left: the menu */}
        <div>
          <div className="relative">
            <label htmlFor="walkin-search" className="sr-only">
              Search the menu
            </label>
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]" />
            <input
              id="walkin-search"
              type="search"
              value={vm.searchText}
              onChange={(event) => vm.setSearchText(event.target.value)}
              placeholder="Search the menu"
              className={`${cafeTheme.input} pl-9`}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
            {categoryTabs.map((category) => {
              const isActive = vm.selectedCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => vm.setSelectedCategoryId(category.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00] ${
                    isActive
                      ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
                      : 'border-[#303030] text-[#a0a0a0] hover:border-[#b6ff00] hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {vm.isLoadingMenu ? (
              <p className={cafeTheme.muted}>Loading the menu...</p>
            ) : vm.menuError ? (
              <div className={`${cafeTheme.card} max-w-md p-6`}>
                <p role="alert" className="text-sm text-[#ff6b6b]">{vm.menuError}</p>
                <button type="button" className={`${cafeTheme.buttonPrimary} mt-4`} onClick={vm.reloadMenu}>
                  Try again
                </button>
              </div>
            ) : vm.visibleMenuItems.length === 0 ? (
              <p className={cafeTheme.muted}>No menu items match your search.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {vm.visibleMenuItems.map((item) => (
                  <WalkInMenuItemCard
                    key={item.id}
                    item={item}
                    categoryName={vm.categoryNames[item.categoryId]}
                    quantityInOrder={vm.quantityInOrder(item.id)}
                    onAdd={vm.addItem}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: the order being built */}
        <WalkInOrderSummary
          lines={vm.orderLines}
          total={vm.orderTotal}
          canReview={vm.canReview}
          customerName={vm.customerName}
          notes={vm.notes}
          onCustomerNameChange={vm.setCustomerName}
          onNotesChange={vm.setNotes}
          onChangeQuantity={vm.changeQuantity}
          onRemove={vm.removeItem}
          onClear={vm.clearOrder}
          onReview={vm.startReview}
        />
      </div>

      {vm.isReviewing && (
        <ReviewWalkInOrderDialog
          lines={vm.orderLines}
          total={vm.orderTotal}
          customerName={vm.customerName}
          notes={vm.notes}
          isSubmitting={vm.isSubmitting}
          error={vm.submitError}
          onBack={vm.backToEditing}
          onSubmit={vm.submitOrder}
        />
      )}
    </section>
  );
}
