/**
 * MenuItemFormDialog.jsx  (View component)
 * One pop-up form used for BOTH "Add menu item" and "Edit menu item".
 * It keeps what the admin types; the checking and saving is done by
 * the view model, which sends any problems back in `errors`.
 */
import { useEffect, useRef, useState } from 'react';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { MENU_ITEM_LIMITS } from '../../../common/models/cafeMenuItem';

/** Starting values: the item's current values when editing, blanks when adding. */
function initialValues(item) {
  if (!item) return { name: '', categoryId: '', price: '', sizeMl: '', description: '', isAvailable: true };
  return {
    name: item.name,
    categoryId: item.categoryId,
    price: String(item.price),
    sizeMl: String(item.sizeMl),
    description: item.description,
    isAvailable: item.isAvailable,
  };
}

/** Red message under a field. */
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-[#ff6b6b]">
      {message}
    </p>
  );
}

export default function MenuItemFormDialog({ mode, item, categories, errors, saveError, isSaving, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => initialValues(item));
  const nameRef = useRef(null);
  const isEdit = mode === 'edit';

  const setField = (field, value) => setValues((previous) => ({ ...previous, [field]: value }));

  // Put the cursor in the name box when the form opens.
  useEffect(() => {
    nameRef.current?.focus();
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
    if (!isSaving) onSubmit(values);
  };

  /** Props shared by every field that can show an error. */
  const fieldProps = (field) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `item-${field}-error` : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={isSaving ? undefined : onCancel} />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-form-title"
        onSubmit={handleSubmit}
        noValidate
        className={`${cafeTheme.card} relative max-h-full w-full max-w-lg overflow-y-auto p-6`}
      >
        <h2 id="item-form-title" className="text-lg font-bold">
          {isEdit ? 'Edit menu item' : 'Add menu item'}
        </h2>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium">Name</label>
            <input
              id="item-name"
              ref={nameRef}
              type="text"
              maxLength={MENU_ITEM_LIMITS.NAME_MAX}
              value={values.name}
              onChange={(event) => setField('name', event.target.value)}
              className={`${cafeTheme.input} mt-1`}
              {...fieldProps('name')}
            />
            <FieldError id="item-name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="item-categoryId" className="block text-sm font-medium">Category</label>
            <select
              id="item-categoryId"
              value={values.categoryId}
              onChange={(event) => setField('categoryId', event.target.value)}
              className={`${cafeTheme.input} mt-1`}
              {...fieldProps('categoryId')}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <FieldError id="item-categoryId-error" message={errors.categoryId} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="item-price" className="block text-sm font-medium">Price (Rs.)</label>
              <input
                id="item-price"
                type="text"
                inputMode="numeric"
                value={values.price}
                onChange={(event) => setField('price', event.target.value)}
                className={`${cafeTheme.input} mt-1`}
                placeholder="650"
                {...fieldProps('price')}
              />
              <FieldError id="item-price-error" message={errors.price} />
            </div>
            <div>
              <label htmlFor="item-sizeMl" className="block text-sm font-medium">Size (ml)</label>
              <input
                id="item-sizeMl"
                type="text"
                inputMode="numeric"
                value={values.sizeMl}
                onChange={(event) => setField('sizeMl', event.target.value)}
                className={`${cafeTheme.input} mt-1`}
                placeholder="350"
                {...fieldProps('sizeMl')}
              />
              <FieldError id="item-sizeMl-error" message={errors.sizeMl} />
            </div>
          </div>

          <div>
            <label htmlFor="item-description" className="block text-sm font-medium">Description (optional)</label>
            <textarea
              id="item-description"
              rows={2}
              maxLength={MENU_ITEM_LIMITS.DESCRIPTION_MAX}
              value={values.description}
              onChange={(event) => setField('description', event.target.value)}
              className={`${cafeTheme.input} mt-1`}
              {...fieldProps('description')}
            />
            <FieldError id="item-description-error" message={errors.description} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.isAvailable}
              onChange={(event) => setField('isAvailable', event.target.checked)}
              className="h-4 w-4 accent-[#b6ff00]"
            />
            Available to order
          </label>
        </div>

        {saveError && (
          <p role="alert" className="mt-4 text-sm text-[#ff6b6b]">
            {saveError}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className={cafeTheme.buttonPrimary} disabled={isSaving}>
            {isSaving ? 'Saving...' : isEdit ? 'Save changes' : 'Add item'}
          </button>
        </div>
      </form>
    </div>
  );
}
