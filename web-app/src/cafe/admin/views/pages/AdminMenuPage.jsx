/**
 * AdminMenuPage.jsx  (View)
 * ------------------------------------------------------------------
 * Administrator: manage the cafe menu.
 * Covers the use cases: Add / Update / Remove Menu Item, View Menu
 * Item Details, Search Menu Items and Update Item Availability.
 * All logic is in useMenuItemsViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { Pencil, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import useMenuItemsViewModel, { ALL_CATEGORIES, AVAILABILITY_FILTERS } from '../../viewmodels/useMenuItemsViewModel';
import AvailabilitySwitch from '../components/AvailabilitySwitch';
import MenuItemDetailsPanel from '../components/MenuItemDetailsPanel';
import MenuItemFormDialog from '../components/MenuItemFormDialog';
import RemoveMenuItemDialog from '../components/RemoveMenuItemDialog';
import FilterChip from '../../../common/views/components/FilterChip';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

export default function AdminMenuPage() {
  const vm = useMenuItemsViewModel();
  const cellClass = 'px-4 py-3 align-middle';
  const iconButtonClass =
    'rounded-lg border border-[#303030] p-2 transition hover:border-[#b6ff00] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[#b6ff00]';

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>Menu Items</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Manage what the cafe sells. Changes show up for staff straight away.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </button>
          <button type="button" className={cafeTheme.buttonPrimary} onClick={vm.openAddForm} disabled={vm.isLoading || !!vm.loadError}>
            <Plus size={16} aria-hidden="true" />
            Add menu item
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="relative mt-6 max-w-md">
        <label htmlFor="menu-search" className="sr-only">Search menu items</label>
        <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]" />
        <input
          id="menu-search"
          type="search"
          value={vm.searchText}
          onChange={(event) => vm.setSearchText(event.target.value)}
          placeholder="Search menu items"
          className={`${cafeTheme.input} pl-9`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip label="All categories" isActive={vm.categoryFilter === ALL_CATEGORIES} onClick={() => vm.setCategoryFilter(ALL_CATEGORIES)} />
        {vm.categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.name}
            isActive={vm.categoryFilter === category.id}
            onClick={() => vm.setCategoryFilter(category.id)}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by availability">
        {AVAILABILITY_FILTERS.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            isActive={vm.availabilityFilter === filter.key}
            onClick={() => vm.setAvailabilityFilter(filter.key)}
          />
        ))}
      </div>

      {/* Messages */}
      {vm.notice && (
        <p role="status" className="mt-4 rounded-lg border border-[#b6ff00]/40 bg-[#b6ff00]/10 p-3 text-sm text-[#b6ff00]">
          {vm.notice}
        </p>
      )}
      {vm.actionError && (
        <p role="alert" className="mt-4 rounded-lg border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 p-3 text-sm text-[#ff6b6b]">
          {vm.actionError}
        </p>
      )}

      {/* Items */}
      <div className="mt-6">
        {vm.isLoading ? (
          <p className={cafeTheme.muted}>Loading the menu...</p>
        ) : vm.loadError ? (
          <div className={`${cafeTheme.card} max-w-md p-6`}>
            <p role="alert" className="text-sm text-[#ff6b6b]">{vm.loadError}</p>
            <button type="button" className={`${cafeTheme.buttonPrimary} mt-4`} onClick={vm.reload}>
              Try again
            </button>
          </div>
        ) : vm.visibleItems.length === 0 ? (
          <div>
            <p className={cafeTheme.muted}>
              {vm.hasActiveFilters ? 'No menu items match your search or filters.' : 'The menu is empty. Add your first item.'}
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
              Showing {vm.visibleItems.length} of {vm.totalCount} items
            </p>
            <div className={`${cafeTheme.card} overflow-x-auto`}>
              <table className="w-full min-w-[54rem] text-left text-sm">
                <caption className="sr-only">Cafe menu items</caption>
                <thead className="border-b border-[#303030] text-xs uppercase text-[#a0a0a0]">
                  <tr>
                    <th scope="col" className={cellClass}>Item</th>
                    <th scope="col" className={cellClass}>Category</th>
                    <th scope="col" className={cellClass}>Size</th>
                    <th scope="col" className={cellClass}>Price</th>
                    <th scope="col" className={cellClass}>Availability</th>
                    <th scope="col" className={cellClass}><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {vm.visibleItems.map((item) => {
                    const isBusy = vm.busyItemId === item.id;
                    return (
                      <tr key={item.id} className="border-b border-[#303030] last:border-0">
                        <th scope="row" className={`${cellClass} text-left`}>
                          <button
                            type="button"
                            onClick={() => vm.openDetails(item)}
                            className="font-semibold underline-offset-4 hover:text-[#b6ff00] hover:underline focus-visible:outline-2 focus-visible:outline-[#b6ff00]"
                          >
                            {item.name}
                          </button>
                          {item.description && (
                            <p className="mt-0.5 max-w-[18rem] truncate text-xs font-normal text-[#a0a0a0]">{item.description}</p>
                          )}
                        </th>
                        <td className={`${cellClass} text-[#a0a0a0]`}>{vm.categoryNames[item.categoryId]}</td>
                        <td className={`${cellClass} text-[#a0a0a0]`}>{item.sizeMl} ml</td>
                        <td className={cellClass}>{formatCurrency(item.price)}</td>
                        <td className={cellClass}>
                          <AvailabilitySwitch
                            itemName={item.name}
                            isAvailable={item.isAvailable}
                            disabled={isBusy}
                            onToggle={() => vm.toggleAvailability(item)}
                          />
                        </td>
                        <td className={`${cellClass} text-right`}>
                          <div className="flex justify-end gap-2">
                            <button type="button" className={iconButtonClass} aria-label={`Edit ${item.name}`} disabled={isBusy} onClick={() => vm.openEditForm(item)}>
                              <Pencil size={16} aria-hidden="true" />
                            </button>
                            <button type="button" className={`${iconButtonClass} hover:!border-[#ff6b6b] hover:text-[#ff6b6b]`} aria-label={`Remove ${item.name}`} disabled={isBusy} onClick={() => vm.requestRemove(item)}>
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
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

      {vm.detailsItem && (
        <MenuItemDetailsPanel
          item={vm.detailsItem}
          categoryName={vm.categoryNames[vm.detailsItem.categoryId]}
          onEdit={vm.openEditForm}
          onRemove={vm.requestRemove}
          onClose={vm.closeDetails}
        />
      )}
      {vm.formMode && (
        <MenuItemFormDialog
          // A new key makes the form start fresh each time it opens.
          key={vm.editingItem?.id ?? 'new-item'}
          mode={vm.formMode}
          item={vm.editingItem}
          categories={vm.categories}
          errors={vm.formErrors}
          saveError={vm.saveError}
          isSaving={vm.isSaving}
          onSubmit={vm.saveItem}
          onCancel={vm.closeForm}
        />
      )}
      {vm.removingItem && (
        <RemoveMenuItemDialog
          item={vm.removingItem}
          isBusy={vm.busyItemId === vm.removingItem.id}
          onConfirm={vm.confirmRemove}
          onCancel={vm.cancelRemove}
        />
      )}
    </section>
  );
}
