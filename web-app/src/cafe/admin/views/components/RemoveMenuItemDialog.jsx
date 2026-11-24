/**
 * RemoveMenuItemDialog.jsx  (View component)
 * Asks the admin to confirm before an item is removed from the menu.
 */
import { useEffect, useRef } from 'react';
import { cafeTheme } from '../../../common/constants/cafeTheme';

export default function RemoveMenuItemDialog({ item, isBusy, onConfirm, onCancel }) {
  const keepButtonRef = useRef(null);

  // Focus the SAFE button first, so Enter never removes by accident.
  useEffect(() => {
    keepButtonRef.current?.focus();
  }, []);

  // Escape cancels (but not while removing).
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && !isBusy) onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel, isBusy]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={isBusy ? undefined : onCancel} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-title"
        aria-describedby="remove-description"
        className={`${cafeTheme.card} relative w-full max-w-md p-6`}
      >
        <h2 id="remove-title" className="text-lg font-bold">
          Remove "{item.name}" from the menu?
        </h2>
        <p id="remove-description" className={`${cafeTheme.muted} mt-2`}>
          It will no longer appear for staff or customers. Past orders keep their details.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button ref={keepButtonRef} type="button" className={cafeTheme.buttonGhost} onClick={onCancel} disabled={isBusy}>
            Keep item
          </button>
          <button type="button" className={cafeTheme.buttonDanger} onClick={onConfirm} disabled={isBusy}>
            {isBusy ? 'Removing...' : 'Remove item'}
          </button>
        </div>
      </div>
    </div>
  );
}
