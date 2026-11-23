/**
 * useWalkInOrderViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Walk-in Order page:
 *   - loads the menu (categories + items)
 *   - category filter and search box
 *   - the order being built (add item, change quantity, remove)
 *   - customer name and notes
 *   - the "review" step and the final submit
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeMenuService from '../../common/services/cafeMenuService';
import cafeOrderService from '../../common/services/cafeOrderService';
import { MAX_QUANTITY_PER_ITEM, calculateOrderTotal } from '../../common/models/cafeOrder';

export const ALL_CATEGORIES = 'all';

/** Keeps a number between a minimum and a maximum. */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function useWalkInOrderViewModel() {
  // Menu
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORIES);
  const [searchText, setSearchText] = useState('');

  // The order being built. `cart` holds only ids and quantities,
  // names and prices are looked up from the menu.
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  // Review and submit
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);

  // ---- Loading the menu ---------------------------------------
  useEffect(() => {
    let cancelled = false; // ignore the answer if the page was closed meanwhile
    Promise.all([cafeMenuService.getCategories(), cafeMenuService.getMenuItems()])
      .then(([loadedCategories, loadedItems]) => {
        if (cancelled) return;
        setCategories(loadedCategories);
        setMenuItems(loadedItems);
      })
      .catch((error) => {
        if (!cancelled) setMenuError(error.message || 'Could not load the menu.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingMenu(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Used by the "Try again" button.
  const reloadMenu = useCallback(async () => {
    setIsLoadingMenu(true);
    setMenuError('');
    try {
      const [loadedCategories, loadedItems] = await Promise.all([
        cafeMenuService.getCategories(),
        cafeMenuService.getMenuItems(),
      ]);
      setCategories(loadedCategories);
      setMenuItems(loadedItems);
    } catch (error) {
      setMenuError(error.message || 'Could not load the menu.');
    } finally {
      setIsLoadingMenu(false);
    }
  }, []);

  // ---- Building the order -------------------------------------
  /** Adds one of an item (or +1 if it is already in the order). */
  const addItem = (menuItem) => {
    if (!menuItem.isAvailable) return;
    setCart((previous) => {
      const existing = previous.find((line) => line.menuItemId === menuItem.id);
      if (!existing) return [...previous, { menuItemId: menuItem.id, quantity: 1 }];
      return previous.map((line) =>
        line.menuItemId === menuItem.id
          ? { ...line, quantity: clamp(line.quantity + 1, 1, MAX_QUANTITY_PER_ITEM) }
          : line
      );
    });
  };

  /** Changes a quantity by +1 or -1 (never below 1 or above the maximum). */
  const changeQuantity = (menuItemId, change) => {
    setCart((previous) =>
      previous.map((line) =>
        line.menuItemId === menuItemId
          ? { ...line, quantity: clamp(line.quantity + change, 1, MAX_QUANTITY_PER_ITEM) }
          : line
      )
    );
  };

  const removeItem = (menuItemId) => {
    setCart((previous) => previous.filter((line) => line.menuItemId !== menuItemId));
  };

  const clearOrder = () => {
    setCart([]);
    setCustomerName('');
    setNotes('');
    setSubmitError('');
  };

  // ---- Review and submit --------------------------------------
  const startReview = () => {
    // An order needs at least one item AND a customer name.
    if (cart.length === 0 || customerName.trim() === '') return;
    setSubmitError('');
    setIsReviewing(true);
  };
  const backToEditing = useCallback(() => {
    setIsReviewing(false);
    setSubmitError('');
  }, []);

  const submitOrder = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const order = await cafeOrderService.createWalkInOrder({
        items: cart.map(({ menuItemId, quantity }) => ({ menuItemId, quantity })),
        notes,
        customerName,
      });
      setCreatedOrder(order);
      setIsReviewing(false);
      clearOrder();
      return true;
    } catch (error) {
      setSubmitError(error.message || 'Could not submit the order. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const startNewOrder = () => setCreatedOrder(null);

  // ---- Values the page displays -------------------------------
  const categoryNames = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
    [categories]
  );

  const visibleMenuItems = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return menuItems.filter(
      (item) =>
        (selectedCategoryId === ALL_CATEGORIES || item.categoryId === selectedCategoryId) &&
        (search === '' || item.name.toLowerCase().includes(search))
    );
  }, [menuItems, selectedCategoryId, searchText]);

  // The order lines with name, price and line total filled in.
  const orderLines = useMemo(
    () =>
      cart
        .map((line) => {
          const item = menuItems.find((m) => m.id === line.menuItemId);
          if (!item) return null;
          return {
            menuItemId: item.id,
            name: item.name,
            unitPrice: item.price,
            quantity: line.quantity,
            lineTotal: item.price * line.quantity,
          };
        })
        .filter(Boolean),
    [cart, menuItems]
  );

  const orderTotal = useMemo(() => calculateOrderTotal(orderLines), [orderLines]);

  // The "Review order" button is only enabled when this is true.
  const canReview = orderLines.length > 0 && customerName.trim().length > 0;

  /** How many of an item are in the order right now (0 if none). */
  const quantityInOrder = (menuItemId) =>
    cart.find((line) => line.menuItemId === menuItemId)?.quantity ?? 0;

  return {
    // menu
    categories,
    categoryNames,
    visibleMenuItems,
    isLoadingMenu,
    menuError,
    selectedCategoryId,
    searchText,
    setSelectedCategoryId,
    setSearchText,
    reloadMenu,
    // the order
    orderLines,
    orderTotal,
    canReview,
    customerName,
    notes,
    setCustomerName,
    setNotes,
    quantityInOrder,
    addItem,
    changeQuantity,
    removeItem,
    clearOrder,
    // review and submit
    isReviewing,
    isSubmitting,
    submitError,
    createdOrder,
    startReview,
    backToEditing,
    submitOrder,
    startNewOrder,
  };
}
