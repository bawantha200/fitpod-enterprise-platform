/**
 * WalkInMenuItemCard.jsx  (View component)
 * One menu item the staff member can add to a walk-in order.
 * Unavailable items are greyed out and cannot be added.
 */
import { Plus } from 'lucide-react';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

export default function WalkInMenuItemCard({ item, categoryName, quantityInOrder, onAdd }) {
  return (
    <article
      aria-label={item.name}
      className={`${cafeTheme.card} flex flex-col justify-between gap-4 p-4 ${item.isAvailable ? '' : 'opacity-60'}`}
    >
      <div>
        <p className="text-xs font-semibold text-[#b6ff00]">{categoryName}</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="font-semibold">{item.name}</h3>
          <span className="shrink-0 text-sm font-bold">{formatCurrency(item.price)}</span>
        </div>
        <p className={`${cafeTheme.muted} mt-1`}>{item.sizeMl} ml</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        {item.isAvailable ? (
          <>
            <button type="button" className={cafeTheme.buttonPrimary} onClick={() => onAdd(item)} aria-label={`Add ${item.name}`}>
              <Plus size={16} aria-hidden="true" />
              Add
            </button>
            {quantityInOrder > 0 && <span className="text-xs text-[#a0a0a0]">In order: {quantityInOrder}</span>}
          </>
        ) : (
          <span className="text-sm font-medium text-[#ff6b6b]">Unavailable</span>
        )}
      </div>
    </article>
  );
}
