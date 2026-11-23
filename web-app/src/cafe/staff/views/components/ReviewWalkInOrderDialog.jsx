/**
 * ReviewWalkInOrderDialog.jsx  (View component)
 * The "Review Walk-in Order" step: staff check the items, notes and
 * total one last time, then submit - or go back and edit.
 */
import { useEffect } from 'react';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

export default function ReviewWalkInOrderDialog({ lines, total, customerName, notes, isSubmitting, error, onBack, onSubmit }) {
  // Escape goes back to editing (but not while the order is being sent).
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && !isSubmitting) onBack();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack, isSubmitting]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={isSubmitting ? undefined : onBack} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        className={`${cafeTheme.card} relative max-h-full w-full max-w-md overflow-y-auto p-6`}
      >
        <h2 id="review-title" className="text-lg font-bold">
          Review walk-in order
        </h2>
        <p className={`${cafeTheme.muted} mt-1`}>Customer: {customerName.trim()}</p>

        <ul className="mt-4 divide-y divide-[#303030] rounded-lg border border-[#303030]">
          {lines.map((line) => (
            <li key={line.menuItemId} className="flex justify-between gap-3 p-3 text-sm">
              <span>
                {line.quantity} × {line.name}
              </span>
              <span>{formatCurrency(line.lineTotal)}</span>
            </li>
          ))}
          <li className="flex justify-between p-3 text-sm font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </li>
        </ul>

        {notes.trim() && <p className="mt-3 rounded-lg bg-[#0a0a0a] p-3 text-sm text-[#a0a0a0]">Note: {notes.trim()}</p>}

        {error && (
          <p role="alert" className="mt-3 text-sm text-[#ff6b6b]">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={onBack} disabled={isSubmitting}>
            Back to edit
          </button>
          <button type="button" className={cafeTheme.buttonPrimary} onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit order'}
          </button>
        </div>
      </div>
    </div>
  );
}
