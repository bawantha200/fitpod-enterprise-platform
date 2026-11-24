/**
 * AdminCategoriesPage.jsx  (View)
 * ------------------------------------------------------------------
 * Administrator: manage the menu categories.
 * Covers the use cases: Add Menu Category, Update Menu Category and
 * Remove Menu Category (blocked while the category has menu items).
 * All logic is in useCategoriesViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import useCategoriesViewModel from '../../viewmodels/useCategoriesViewModel';
import CategoryFormDialog from '../components/CategoryFormDialog';
import RemoveCategoryDialog from '../components/RemoveCategoryDialog';
import { cafeTheme } from '../../../common/constants/cafeTheme';

export default function AdminCategoriesPage() {
  const vm = useCategoriesViewModel();
  const cellClass = 'px-4 py-3 align-middle';
  const iconButtonClass =
    'rounded-lg border border-[#303030] p-2 transition hover:border-[#b6ff00] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[#b6ff00]';

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>Categories</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Group menu items, for example Fresh Juices and Smoothies.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </button>
          <button type="button" className={cafeTheme.buttonPrimary} onClick={vm.openAddForm} disabled={vm.isLoading || !!vm.loadError}>
            <Plus size={16} aria-hidden="true" />
            Add category
          </button>
        </div>
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

      {/* Categories */}
      <div className="mt-6">
        {vm.isLoading ? (
          <p className={cafeTheme.muted}>Loading categories...</p>
        ) : vm.loadError ? (
          <div className={`${cafeTheme.card} max-w-md p-6`}>
            <p role="alert" className="text-sm text-[#ff6b6b]">{vm.loadError}</p>
            <button type="button" className={`${cafeTheme.buttonPrimary} mt-4`} onClick={vm.reload}>
              Try again
            </button>
          </div>
        ) : vm.categories.length === 0 ? (
          <p className={cafeTheme.muted}>There are no categories yet. Add your first one.</p>
        ) : (
          <div className={`${cafeTheme.card} max-w-2xl overflow-x-auto`}>
            <table className="w-full min-w-[28rem] text-left text-sm">
              <caption className="sr-only">Menu categories</caption>
              <thead className="border-b border-[#303030] text-xs uppercase text-[#a0a0a0]">
                <tr>
                  <th scope="col" className={cellClass}>Category</th>
                  <th scope="col" className={cellClass}>Menu items</th>
                  <th scope="col" className={cellClass}><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {vm.categories.map((category) => {
                  const count = vm.itemCounts[category.id] ?? 0;
                  const isBusy = vm.busyCategoryId === category.id;
                  return (
                    <tr key={category.id} className="border-b border-[#303030] last:border-0">
                      <th scope="row" className={`${cellClass} text-left font-semibold`}>{category.name}</th>
                      <td className={`${cellClass} text-[#a0a0a0]`}>
                        {count} {count === 1 ? 'item' : 'items'}
                      </td>
                      <td className={`${cellClass} text-right`}>
                        <div className="flex justify-end gap-2">
                          <button type="button" className={iconButtonClass} aria-label={`Rename ${category.name}`} disabled={isBusy} onClick={() => vm.openEditForm(category)}>
                            <Pencil size={16} aria-hidden="true" />
                          </button>
                          <button type="button" className={`${iconButtonClass} hover:!border-[#ff6b6b] hover:text-[#ff6b6b]`} aria-label={`Remove ${category.name}`} disabled={isBusy} onClick={() => vm.requestRemove(category)}>
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
        )}
      </div>

      {vm.formMode && (
        <CategoryFormDialog
          // A new key makes the form start fresh each time it opens.
          key={vm.editingCategory?.id ?? 'new-category'}
          mode={vm.formMode}
          category={vm.editingCategory}
          nameError={vm.nameError}
          saveError={vm.saveError}
          isSaving={vm.isSaving}
          onSubmit={vm.saveCategory}
          onCancel={vm.closeForm}
        />
      )}
      {vm.removingCategory && (
        <RemoveCategoryDialog
          category={vm.removingCategory}
          itemCount={vm.removingItemCount}
          isBusy={vm.busyCategoryId === vm.removingCategory.id}
          onConfirm={vm.confirmRemove}
          onCancel={vm.cancelRemove}
        />
      )}
    </section>
  );
}
