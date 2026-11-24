/**
 * useMenuItemsViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Admin "Menu Items" page:
 *   - loads the menu and categories
 *   - search, category filter and availability filter
 *   - add / edit (one shared form), availability switch, remove
 *   - which item's details panel is open
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeMenuService from '../../common/services/cafeMenuService';
import { validateMenuItemInput } from '../../common/models/cafeMenuItem';

export const ALL_CATEGORIES = 'all';

export const AVAILABILITY_FILTERS = [
  { key: 'all', label: 'All items' },
  { key: 'available', label: 'Available' },
  { key: 'unavailable', label: 'Unavailable' },
];

export default function useMenuItemsViewModel() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyItemId, setBusyItemId] = useState(null);

  // Filters
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Panels and dialogs
  const [detailsItemId, setDetailsItemId] = useState(null);
  const [form, setForm] = useState({ mode: null, itemId: null }); // mode: null | 'add' | 'edit'
  const [formErrors, setFormErrors] = useState({});
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

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
        if (!cancelled) setLoadError(error.message || 'Could not load the menu.');
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
      setLoadError(error.message || 'Could not load the menu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Add / edit form -----------------------------------------
  const openAddForm = () => {
    setFormErrors({});
    setSaveError('');
    setForm({ mode: 'add', itemId: null });
  };
  const openEditForm = (item) => {
    setFormErrors({});
    setSaveError('');
    setDetailsItemId(null); // close the details panel if it was open
    setForm({ mode: 'edit', itemId: item.id });
  };
  const closeForm = useCallback(() => {
    setForm({ mode: null, itemId: null });
    setFormErrors({});
    setSaveError('');
  }, []);

  /** Checks and saves the form. Returns true when the item was saved. */
  const saveItem = async (formValues) => {
    const editingId = form.mode === 'edit' ? form.itemId : null;

    // 1. Check the values on the screen first, so errors show next to each field.
    const { errors, values } = validateMenuItemInput(formValues, {
      categoryIds: categories.map((category) => category.id),
      otherItems: items.filter((item) => item.id !== editingId),
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    // 2. Save through the service.
    setFormErrors({});
    setSaveError('');
    setNotice('');
    setIsSaving(true);
    try {
      const saved = editingId
        ? await cafeMenuService.updateMenuItem(editingId, values)
        : await cafeMenuService.createMenuItem(values);
      setItems((previous) =>
        editingId ? previous.map((item) => (item.id === saved.id ? saved : item)) : [...previous, saved]
      );
      setNotice(`"${saved.name}" ${editingId ? 'updated' : 'added to the menu'}.`);
      closeForm();
      return true;
    } catch (error) {
      setSaveError(error.message || 'Could not save the item. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // ---- Availability switch -------------------------------------
  const toggleAvailability = async (item) => {
    setBusyItemId(item.id);
    setActionError('');
    setNotice('');
    try {
      const updated = await cafeMenuService.setItemAvailability(item.id, !item.isAvailable);
      setItems((previous) => previous.map((i) => (i.id === updated.id ? updated : i)));
      setNotice(`"${updated.name}" is now ${updated.isAvailable ? 'available' : 'unavailable'}.`);
    } catch (error) {
      setActionError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setBusyItemId(null);
    }
  };

  // ---- Remove (two steps: ask, then confirm) -------------------
  const requestRemove = (item) => {
    setActionError('');
    setDetailsItemId(null);
    setRemovingItemId(item.id);
  };
  const cancelRemove = useCallback(() => setRemovingItemId(null), []);
  const confirmRemove = async () => {
    const item = items.find((i) => i.id === removingItemId);
    if (!item) return;
    setBusyItemId(item.id);
    setActionError('');
    setNotice('');
    try {
      await cafeMenuService.removeMenuItem(item.id);
      setItems((previous) => previous.filter((i) => i.id !== item.id));
      setNotice(`"${item.name}" was removed from the menu.`);
    } catch (error) {
      setActionError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setBusyItemId(null);
      setRemovingItemId(null);
    }
  };

  // ---- Details panel -------------------------------------------
  const openDetails = (item) => setDetailsItemId(item.id);
  const closeDetails = useCallback(() => setDetailsItemId(null), []);

  // ---- Values the page displays --------------------------------
  const categoryNames = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
    [categories]
  );

  // Items grouped by category order, then A-Z.
  const sortedItems = useMemo(() => {
    const order = Object.fromEntries(categories.map((category, index) => [category.id, index]));
    return [...items].sort(
      (a, b) => (order[a.categoryId] ?? 99) - (order[b.categoryId] ?? 99) || a.name.localeCompare(b.name)
    );
  }, [items, categories]);

  const visibleItems = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return sortedItems.filter(
      (item) =>
        (categoryFilter === ALL_CATEGORIES || item.categoryId === categoryFilter) &&
        (availabilityFilter === 'all' || (availabilityFilter === 'available') === item.isAvailable) &&
        (search === '' ||
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search))
    );
  }, [sortedItems, searchText, categoryFilter, availabilityFilter]);

  const hasActiveFilters =
    searchText.trim() !== '' || categoryFilter !== ALL_CATEGORIES || availabilityFilter !== 'all';

  const resetFilters = () => {
    setSearchText('');
    setCategoryFilter(ALL_CATEGORIES);
    setAvailabilityFilter('all');
  };

  return {
    // data
    categories,
    categoryNames,
    visibleItems,
    totalCount: items.length,
    detailsItem: items.find((i) => i.id === detailsItemId) ?? null,
    editingItem: form.mode === 'edit' ? items.find((i) => i.id === form.itemId) ?? null : null,
    removingItem: items.find((i) => i.id === removingItemId) ?? null,
    // state
    isLoading,
    loadError,
    actionError,
    notice,
    busyItemId,
    formMode: form.mode,
    formErrors,
    saveError,
    isSaving,
    searchText,
    categoryFilter,
    availabilityFilter,
    hasActiveFilters,
    // actions
    setSearchText,
    setCategoryFilter,
    setAvailabilityFilter,
    resetFilters,
    reload,
    openAddForm,
    openEditForm,
    closeForm,
    saveItem,
    toggleAvailability,
    requestRemove,
    cancelRemove,
    confirmRemove,
    openDetails,
    closeDetails,
  };
}
