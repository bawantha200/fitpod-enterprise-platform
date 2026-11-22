/**
 * RejectOrderDialog.jsx  (View component)
 * Pop-up that makes staff type a REASON before an order is rejected.
 * The customer will see this reason in the mobile app later.
 */
import { useEffect, useRef, useState } from 'react';
import { cafeTheme } from '../../../common/constants/cafeTheme';

const MAX_LENGTH = 200;
const QUICK_REASONS = ['An item is out of stock', 'The kitchen is too busy right now', 'The cafe is closing soon'];

export default function RejectOrderDialog({ order, isBusy, error, onConfirm, onCancel }) {
  const [reason, setReason] = useState('');
  const textareaRef = useRef(null);
  const canSubmit = reason.trim().length > 0 && !isBusy;

  // Put the cursor in the text box when the dialog opens.
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Escape closes the dialog.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSubmit) onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-title"
        onSubmit={handleSubmit}
        className={`${cafeTheme.card} relative w-full max-w-md p-6`}
      >
        <h2 id="reject-title" className="text-lg font-bold">
          Reject order #{order.orderNumber}?
        </h2>
        <p className={`${cafeTheme.muted} mt-1`}>The customer will be told why. A reason is required.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_REASONS.map((quick) => (
            <button key={quick} type="button" className={`${cafeTheme.buttonGhost} !px-3 !py-1 !text-xs`} onClick={() => setReason(quick)}>
              {quick}
            </button>
          ))}
        </div>

        <label htmlFor="reject-reason" className="mt-4 block text-sm font-medium">
          Reason
        </label>
        <textarea
          id="reject-reason"
          ref={textareaRef}
          rows={3}
          maxLength={MAX_LENGTH}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className={`${cafeTheme.input} mt-1`}
          placeholder="Type the reason here"
        />
        <p className="mt-1 text-right text-xs text-[#a0a0a0]">
          {reason.length}/{MAX_LENGTH}
        </p>

        {error && (
          <p role="alert" className="mt-2 text-sm text-[#ff6b6b]">
            {error}
          </p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={onCancel}>
            Keep order
          </button>
          <button type="submit" className={cafeTheme.buttonDanger} disabled={!canSubmit}>
            Reject order
          </button>
        </div>
      </form>
    </div>
  );
}
