/**
 * mockMenu.js  (Model layer)
 * ------------------------------------------------------------------
 * TEMPORARY fake cafe menu (categories + items) so screens can be
 * built before the backend exists. The first three items and prices
 * match the group's draft website. The Admin menu screens (a later
 * step) will add, edit and remove items in this same data.
 *
 * Menu item shape:
 *   { id, name, categoryId, price (Rs.), sizeMl, description, isAvailable, isRemoved }
 *   isAvailable = shown greyed out when false; isRemoved = hidden everywhere
 *   (an admin "Remove"; the item is kept so old orders stay valid).
 * ------------------------------------------------------------------
 */

/** Returns a FRESH copy every time, so changes never leak between runs. */
export function createMockMenu() {
  return {
    categories: [
      { id: 'c1', name: 'Fresh Juices' },
      { id: 'c2', name: 'Smoothies' },
      { id: 'c3', name: 'Healthy Drinks' },
    ],
    items: [
      { id: 'm1', name: 'Green Energy', categoryId: 'c2', price: 650, sizeMl: 350, description: 'A refreshing blend of fresh greens and fruits.', isAvailable: true },
      { id: 'm2', name: 'Orange Boost', categoryId: 'c1', price: 550, sizeMl: 300, description: 'A naturally refreshing orange and carrot blend.', isAvailable: true },
      { id: 'm3', name: 'Berry Power', categoryId: 'c2', price: 700, sizeMl: 350, description: 'A fruity smoothie with a delicious berry flavour.', isAvailable: true },
      { id: 'm4', name: 'Watermelon Splash', categoryId: 'c1', price: 480, sizeMl: 300, description: 'Cold-pressed watermelon with a squeeze of lime.', isAvailable: true },
      { id: 'm5', name: 'Pineapple Mint', categoryId: 'c1', price: 520, sizeMl: 300, description: 'Pineapple juice with fresh mint.', isAvailable: true },
      { id: 'm6', name: 'Banana Oat', categoryId: 'c2', price: 680, sizeMl: 350, description: 'Banana and oats blended with milk.', isAvailable: true },
      { id: 'm7', name: 'Mango Protein', categoryId: 'c2', price: 750, sizeMl: 400, description: 'Mango smoothie with a scoop of protein.', isAvailable: true },
      { id: 'm8', name: 'Ginger Immunity Shot', categoryId: 'c3', price: 350, sizeMl: 60, description: 'Ginger, turmeric and lemon shot.', isAvailable: true },
      { id: 'm9', name: 'Iced Green Tea', categoryId: 'c3', price: 400, sizeMl: 350, description: 'Unsweetened iced green tea.', isAvailable: true },
      { id: 'm10', name: 'Coconut Water', categoryId: 'c3', price: 380, sizeMl: 330, description: 'Fresh king coconut water.', isAvailable: true },
      { id: 'm11', name: 'Avocado Shake', categoryId: 'c2', price: 720, sizeMl: 350, description: 'Creamy avocado shake.', isAvailable: false },
    ].map((item) => ({ ...item, isRemoved: false })),
  };
}
