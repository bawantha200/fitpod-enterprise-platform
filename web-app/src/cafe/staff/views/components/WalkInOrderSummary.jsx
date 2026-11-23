/**
 * WalkInOrderSummary.jsx  (View component)
 * The "Current order" panel: the items picked so far with quantity
 * controls, the running total, optional customer name and notes, and
 * the button that starts the review step.
 */
import { Trash2 } from 'lucide-react';
import QuantityStepper from '../../../common/views/components/QuantityStepper';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { MAX_CUSTOMER_NAME_LENGTH, MAX_NOTE_LENGTH, MAX_QUANTITY_PER_ITEM } from '../../../common/models/cafeOrder';
import { formatCurrency } from '../../../common/utils/formatters';

export default function WalkInOrderSummary({
  lines,
  total,
  canReview,
  customerName,
  notes,
  onCustomerNameChange,
  onNotesChange,
  onChangeQuantity,
  onRemove,
  onClear,
  onReview,
}) {
  const isEmpty = lines.length === 0;
  const isNameMissing = customerName.trim() === '';
  const hasAnythingToClear = !isEmpty || customerName !== '' || notes !== '';

  return (
    <section aria-labelledby="current-order-title" className={`${cafeTheme.card} flex flex-col gap-4 p-5 lg:sticky lg:top-6`}>
      <h2 id="current-order-title" className="text-lg font-bold">
        Current order
      </h2>

      {isEmpty ? (
        <p className={cafeTheme.muted}>No items yet. Press Add on a menu item.</p>
      ) : (
        <ul className="divide-y divide-[#303030]">
          {lines.map((line) => (
            <li key={line.menuItemId} className="flex flex-col gap-2 py-3">
              <div className="flex justify-between gap-3 text-sm">
                <span className="font-medium">{line.name}</span>
                <span>{formatCurrency(line.lineTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <QuantityStepper
                  value={line.quantity}
                  max={MAX_QUANTITY_PER_ITEM}
                  label={line.name}
                  onDecrease={() => onChangeQuantity(line.menuItemId, -1)}
                  onIncrease={() => onChangeQuantity(line.menuItemId, 1)}
                />
                <button
                  type="button"
                  onClick={() => onRemove(line.menuItemId)}
                  aria-label={`Remove ${line.name}`}
                  className="rounded-lg p-2 text-[#a0a0a0] transition hover:text-[#ff6b6b] focus-visible:outline-2 focus-visible:outline-[#ff6b6b]"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <label htmlFor="walkin-name" className="block text-sm font-medium">
          Customer name <span className="text-[#ff6b6b]" aria-hidden="true">*</span>
        </label>
        <input
          id="walkin-name"
          type="text"
          required
          aria-describedby={!isEmpty && isNameMissing ? 'walkin-name-hint' : undefined}
          maxLength={MAX_CUSTOMER_NAME_LENGTH}
          value={customerName}
          onChange={(event) => onCustomerNameChange(event.target.value)}
          className={`${cafeTheme.input} mt-1`}
          placeholder="Name to call out when it is ready"
        />
        {!isEmpty && isNameMissing && (
          <p id="walkin-name-hint" className="mt-1 text-xs text-[#ffde59]">
            Enter the customer name to review the order.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="walkin-notes" className="block text-sm font-medium">
          Order notes (optional)
        </label>
        <textarea
          id="walkin-notes"
          rows={2}
          maxLength={MAX_NOTE_LENGTH}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          className={`${cafeTheme.input} mt-1`}
          placeholder="For example: less sugar"
        />
      </div>

      <div className="flex items-center justify-between border-t border-[#303030] pt-4">
        <span className="text-sm text-[#a0a0a0]">Total</span>
        <span className="text-xl font-bold">{formatCurrency(total)}</span>
      </div>

      <div className="flex gap-2">
        <button type="button" className={`${cafeTheme.buttonPrimary} flex-1`} disabled={!canReview} onClick={onReview}>
          Review order
        </button>
        <button type="button" className={cafeTheme.buttonGhost} disabled={!hasAnythingToClear} onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  );
}
