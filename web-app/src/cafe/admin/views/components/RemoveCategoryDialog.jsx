/**
 * RemoveCategoryDialog.jsx  (View component)
 * Two versions of the same pop-up:
 *   - the category still has menu items -> it CANNOT be removed; we
 *     explain why and link to the Menu Items page to move them
 *   - the category is empty -> ask the admin to confirm
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { CAFE_BASE_PATH } from '../../../common/constants/cafeRoles';

export default function RemoveCategoryDialog({ category, itemCount, isBusy, onConfirm, onCancel }) {
  const safeButtonRef = useRef(null);
  const isBlocked = itemCount > 0;

  // Focus the SAFE button first, so Enter never removes by accident.
  useEffect(() => {
    safeButtonRef.current?.focus();
  }, []);

  // Escape closes the pop-up (but not while removing).
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
        aria-labelledby="remove-category-title"
        aria-describedby="remove-category-description"
        className={`${cafeTheme.card} relative w-full max-w-md p-6`}
      >
        {isBlocked ? (
          <>
            <h2 id="remove-category-title" className="text-lg font-bold">
              Cannot remove "{category.name}"
            </h2>
            <p id="remove-category-description" className={`${cafeTheme.muted} mt-2`}>
              It still has {itemCount} menu {itemCount === 1 ? 'item' : 'items'}. Move {itemCount === 1 ? 'it' : 'them'} to another
              category or remove {itemCount === 1 ? 'it' : 'them'} first, then try again.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button ref={safeButtonRef} type="button" className={cafeTheme.buttonGhost} onClick={onCancel}>
                Close
              </button>
              <Link to={`${CAFE_BASE_PATH}/admin/menu`} className={cafeTheme.buttonPrimary}>
                Go to Menu Items
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 id="remove-category-title" className="text-lg font-bold">
              Remove "{category.name}"?
            </h2>
            <p id="remove-category-description" className={`${cafeTheme.muted} mt-2`}>
              This category is empty, so nothing on the menu is affected.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button ref={safeButtonRef} type="button" className={cafeTheme.buttonGhost} onClick={onCancel} disabled={isBusy}>
                Keep category
              </button>
              <button type="button" className={cafeTheme.buttonDanger} onClick={onConfirm} disabled={isBusy}>
                {isBusy ? 'Removing...' : 'Remove category'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
