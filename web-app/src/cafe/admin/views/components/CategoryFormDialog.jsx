/**
 * CategoryFormDialog.jsx  (View component)
 * One pop-up used for BOTH "Add category" and "Rename category".
 * It keeps what the admin types; checking and saving is done by the
 * view model, which sends any problem back in `nameError`.
 */
import { useEffect, useRef, useState } from 'react';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { CATEGORY_LIMITS } from '../../../common/models/cafeCategory';

export default function CategoryFormDialog({ mode, category, nameError, saveError, isSaving, onSubmit, onCancel }) {
  const [name, setName] = useState(category?.name ?? '');
  const inputRef = useRef(null);
  const isEdit = mode === 'edit';

  // Put the cursor in the name box when the form opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape closes the form (but not while saving).
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && !isSaving) onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel, isSaving]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isSaving) onSubmit(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={isSaving ? undefined : onCancel} />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-form-title"
        onSubmit={handleSubmit}
        noValidate
        className={`${cafeTheme.card} relative w-full max-w-md p-6`}
      >
        <h2 id="category-form-title" className="text-lg font-bold">
          {isEdit ? 'Rename category' : 'Add category'}
        </h2>

        <label htmlFor="category-name" className="mt-4 block text-sm font-medium">
          Category name
        </label>
        <input
          id="category-name"
          ref={inputRef}
          type="text"
          maxLength={CATEGORY_LIMITS.NAME_MAX}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`${cafeTheme.input} mt-1`}
          placeholder="For example: Protein Shakes"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? 'category-name-error' : undefined}
        />
        {nameError && (
          <p id="category-name-error" className="mt-1 text-xs text-[#ff6b6b]">
            {nameError}
          </p>
        )}

        {saveError && (
          <p role="alert" className="mt-3 text-sm text-[#ff6b6b]">
            {saveError}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className={cafeTheme.buttonPrimary} disabled={isSaving}>
            {isSaving ? 'Saving...' : isEdit ? 'Save name' : 'Add category'}
          </button>
        </div>
      </form>
    </div>
  );
}
