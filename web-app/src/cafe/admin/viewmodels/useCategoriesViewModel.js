/**
 * useCategoriesViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Admin "Categories" page:
 *   - loads the categories and counts the menu items in each
 *   - add / rename (one shared form)
 *   - remove (blocked while the category still has menu items)
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeMenuService from '../../common/services/cafeMenuService';
import { validateCategoryName } from '../../common/models/cafeCategory';

export default function useCategoriesViewModel() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyCategoryId, setBusyCategoryId] = useState(null);

  // Add / rename form
  const [form, setForm] = useState({ mode: null, categoryId: null }); // mode: null | 'add' | 'edit'
  const [nameError, setNameError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Remove dialog
  const [removingCategoryId, setRemovingCategoryId] = useState(null);

  // ---- Loading -------------------------------------------------
  useEffect(() => {
    let cancelled = false; // ignore the answer if the page was closed meanwhile
    Promise.all([cafeMenuService.getCategories(), cafeMenuService.getMenuItems()])
      .then(([loadedCategories, loadedItems]) => {
        if (cancelled) return;
        setCategories(loadedCategories);
        setItems(loadedItems);
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message || 'Could not load the categories.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Used by the Refresh / Try again buttons.
  const reload = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const [loadedCategories, loadedItems] = await Promise.all([
        cafeMenuService.getCategories(),
        cafeMenuService.getMenuItems(),
      ]);
      setCategories(loadedCategories);
      setItems(loadedItems);
    } catch (error) {
      setLoadError(error.message || 'Could not load the categories.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Add / rename form ---------------------------------------
  const openAddForm = () => {
    setNameError('');
    setSaveError('');
    setForm({ mode: 'add', categoryId: null });
  };
  const openEditForm = (category) => {
    setNameError('');
    setSaveError('');
    setForm({ mode: 'edit', categoryId: category.id });
  };
  const closeForm = useCallback(() => {
    setForm({ mode: null, categoryId: null });
    setNameError('');
    setSaveError('');
  }, []);

  /** Checks and saves the name. Returns true when it was saved. */
  const saveCategory = async (nameInput) => {
    const editingId = form.mode === 'edit' ? form.categoryId : null;

    // 1. Check on the screen first, so the error shows next to the field.
    const { error, name } = validateCategoryName(nameInput, {
      otherCategories: categories.filter((category) => category.id !== editingId),
    });
    if (error) {
      setNameError(error);
      return false;
    }

    // 2. Save through the service.
    setNameError('');
    setSaveError('');
    setNotice('');
    setIsSaving(true);
    try {
      const saved = editingId
        ? await cafeMenuService.updateCategory(editingId, name)
        : await cafeMenuService.createCategory(name);
      setCategories((previous) =>
        editingId ? previous.map((c) => (c.id === saved.id ? saved : c)) : [...previous, saved]
      );
      setNotice(`Category "${saved.name}" ${editingId ? 'renamed' : 'added'}.`);
      closeForm();
      return true;
    } catch (error) {
      setSaveError(error.message || 'Could not save the category. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // ---- Remove --------------------------------------------------
  const requestRemove = (category) => {
    setActionError('');
    setRemovingCategoryId(category.id);
  };
  const cancelRemove = useCallback(() => setRemovingCategoryId(null), []);

  const confirmRemove = async () => {
    const category = categories.find((c) => c.id === removingCategoryId);
    if (!category) return;
    setBusyCategoryId(category.id);
    setActionError('');
    setNotice('');
    try {
      await cafeMenuService.removeCategory(category.id);
      setCategories((previous) => previous.filter((c) => c.id !== category.id));
      setNotice(`Category "${category.name}" was removed.`);
    } catch (error) {
      setActionError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setBusyCategoryId(null);
      setRemovingCategoryId(null);
    }
  };

  // ---- Values the page displays --------------------------------
  // How many menu items are in each category.
  const itemCounts = useMemo(() => {
    const counts = Object.fromEntries(categories.map((category) => [category.id, 0]));
    items.forEach((item) => {
      if (item.categoryId in counts) counts[item.categoryId] += 1;
    });
    return counts;
  }, [categories, items]);

  const removingCategory = categories.find((c) => c.id === removingCategoryId) ?? null;

  return {
    // data
    categories,
    itemCounts,
    editingCategory: form.mode === 'edit' ? categories.find((c) => c.id === form.categoryId) ?? null : null,
    removingCategory,
    removingItemCount: removingCategory ? itemCounts[removingCategory.id] ?? 0 : 0,
    // state
    isLoading,
    loadError,
    actionError,
    notice,
    busyCategoryId,
    formMode: form.mode,
    nameError,
    saveError,
    isSaving,
    // actions
    reload,
    openAddForm,
    openEditForm,
    closeForm,
    saveCategory,
    requestRemove,
    cancelRemove,
    confirmRemove,
  };
}
