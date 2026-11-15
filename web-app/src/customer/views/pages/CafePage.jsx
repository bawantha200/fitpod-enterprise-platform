import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  ArrowLeft,
  ArrowUpRight,
  ShoppingCart,
  Trash2,
  Check,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  'All Drinks',
  'Fresh Juices',
  'Smoothies',
  'Healthy Drinks',
];

// Sample products only. Replace with confirmed cafe menu and prices.
const products = [
  {
    id: 1,
    name: 'Green Energy',
    category: 'Smoothies',
    description: 'A refreshing blend of fresh greens and fruits.',
    price: 650,
    size: '350 ml',
    ingredients: ['Green apple', 'Spinach', 'Cucumber'],
    image:
      'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=900',
    available: true,
    tag: 'POPULAR',
  },
  {
    id: 2,
    name: 'Orange Boost',
    category: 'Fresh Juices',
    description: 'A naturally refreshing orange and carrot blend.',
    price: 550,
    size: '300 ml',
    ingredients: ['Orange', 'Carrot'],
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=900',
    available: true,
    tag: 'FRESH',
  },
  {
    id: 3,
    name: 'Berry Power',
    category: 'Smoothies',
    description: 'A fruity smoothie with a delicious berry flavour.',
    price: 700,
    size: '350 ml',
    ingredients: ['Strawberry', 'Banana', 'Yoghurt'],
    image:
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=900',
    available: true,
    tag: '',
  },
  {
    id: 4,
    name: 'Lemon Refresh',
    category: 'Healthy Drinks',
    description: 'A light and refreshing lemon and mint drink.',
    price: 450,
    size: '300 ml',
    ingredients: ['Lemon', 'Mint', 'Water'],
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=900',
    available: true,
    tag: '',
  },
  {
    id: 5,
    name: 'Tropical Mix',
    category: 'Fresh Juices',
    description: 'A refreshing tropical fruit juice concept.',
    price: 600,
    size: '300 ml',
    ingredients: ['Pineapple', 'Mango', 'Orange'],
    image:
      'https://images.unsplash.com/photo-1546173159-315724a31696?w=900',
    available: true,
    tag: '',
  },
  {
    id: 6,
    name: 'Banana Oat Smoothie',
    category: 'Smoothies',
    description: 'A creamy banana smoothie with oats.',
    price: 750,
    size: '350 ml',
    ingredients: ['Banana', 'Oats', 'Milk'],
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=900',
    available: true,
    tag: '',
  },
];

const formatPrice = (price) =>
  `Rs. ${Number(price).toLocaleString('en-LK')}`;

function CafePage() {
  const [activeCategory, setActiveCategory] = useState('All Drinks');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All Drinks') {
      return products;
    }

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentCart,
        { ...product, quantity },
      ];
    });

    setSelectedProduct(null);
  };

  const updateCartQuantity = (productId, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0A0A0A] pt-[88px]">

        {/* HERO */}
        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-[1312px] space-y-8">
            <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
              THE FITPOD NATURAL NUTRITION CAFE
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-2px] text-white sm:text-6xl">
              GOOD ENERGY.
              <br />
              NATURALLY.
            </h1>

            <p className="max-w-[640px] text-base leading-6 text-[#A0A0A0]">
              Fresh ingredients. Thoughtful choices. A little
              time to refuel, before or after your workout.
            </p>

            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[540px]">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1800"
                alt="Fresh natural drinks"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-md">
                <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
                  MOVE. REFUEL. REPEAT.
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Your feel-good stop.
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="bg-[#171717] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-[1312px]">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
                  FRESHLY MADE FOR YOU
                </p>

                <h2 className="text-4xl font-bold text-white sm:text-5xl">
                  Explore our menu.
                </h2>

                <p className="max-w-xl text-sm leading-6 text-[#A0A0A0]">
                  Discover refreshing drinks made to complement
                  your FitPod experience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCart(true)}
                className="relative inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-[10px] border border-[#303030] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#B6FF00] hover:text-[#B6FF00] sm:self-auto"
              >
                <ShoppingBag size={18} />
                Your Cart
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#B6FF00] px-1.5 text-xs font-bold text-black">
                  {cartCount}
                </span>
              </button>
            </div>

            {/* CATEGORY FILTER */}
            <div className="mt-10 flex gap-3 overflow-x-auto pb-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-xs font-semibold transition ${
                    activeCategory === category
                      ? 'border-[#B6FF00] bg-[#B6FF00] text-black'
                      : 'border-[#303030] bg-transparent text-[#A0A0A0] hover:border-[#B6FF00] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* PRODUCT GRID */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-[#303030] bg-[#0A0A0A] transition duration-300 hover:-translate-y-1 hover:border-[#B6FF00]/60"
                >
                  <button
                    type="button"
                    onClick={() => openProduct(product)}
                    className="block w-full text-left"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {product.tag && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#B6FF00] px-3 py-1.5 text-[10px] font-bold tracking-wider text-black">
                          {product.tag}
                        </span>
                      )}

                      {!product.available && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/65 text-sm font-semibold text-white">
                          Currently unavailable
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 p-5">
                      <p className="text-[10px] font-semibold tracking-[1.5px] text-[#B6FF00]">
                        {product.category.toUpperCase()}
                      </p>

                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-semibold text-white">
                          {product.name}
                        </h3>

                        <span className="shrink-0 text-sm font-semibold text-white">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <p className="min-h-10 text-sm leading-5 text-[#A0A0A0]">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-[#303030] pt-4">
                        <span className="text-xs text-[#A0A0A0]">
                          {product.size}
                        </span>

                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#B6FF00]">
                          View details
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="px-5 pb-5">
                    <button
                      type="button"
                      disabled={!product.available}
                      onClick={() => addToCart(product)}
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] text-xs font-bold text-black transition hover:bg-[#A5E600] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={16} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="py-16 text-center text-sm text-[#A0A0A0]">
                No drinks available in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* CAFE EXPERIENCE */}
        <section className="px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-[1312px] items-center gap-10 lg:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200"
              alt="Fresh natural ingredients"
              className="h-[360px] w-full rounded-2xl object-cover sm:h-[430px]"
            />

            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
                FUEL YOUR FITNESS JOURNEY
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Feel good,
                <br />
                from within.
              </h2>

              <p className="text-base leading-6 text-[#A0A0A0]">
                Fitness and nourishment belong together. The
                FitPod cafe brings fresh juices, smoothies and
                natural drinks into the same considered experience.
              </p>

              <p className="text-base leading-6 text-[#D8D8D8]">
                Simple ingredients. A slower moment. Better
                energy for whatever comes next.
              </p>

              <button
                type="button"
                onClick={() =>
                  document.getElementById('menu')?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
                className="rounded-[10px] border border-[#303030] px-5 py-3.5 text-xs font-semibold text-white transition hover:border-[#B6FF00] hover:text-[#B6FF00]"
              >
                Explore Our Drinks ↓
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#263018] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[1312px] space-y-7">
            <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
              MOVE. REFUEL. REPEAT.
            </p>

            <h2 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
              YOUR NEXT
              <br />
              FEEL-GOOD MOMENT.
            </h2>

            <button
              type="button"
              onClick={() =>
                document.getElementById('menu')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
              className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-xs font-semibold text-black transition hover:-translate-y-1 hover:bg-[#A5E600]"
            >
              Explore Our Menu
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} details`}
            className="relative max-h-[90vh] w-full max-w-[760px] overflow-y-auto rounded-2xl border border-[#303030] bg-[#171717]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 text-white hover:text-[#B6FF00]"
            >
              <X size={20} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-64 w-full object-cover sm:h-[330px]"
            />

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold tracking-[2px] text-[#B6FF00]">
                  {selectedProduct.category.toUpperCase()}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {selectedProduct.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#A0A0A0]">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#303030] bg-[#0A0A0A] p-4">
                  <p className="text-xs text-[#A0A0A0]">
                    Serving size
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {selectedProduct.size}
                  </p>
                </div>

                <div className="rounded-xl border border-[#303030] bg-[#0A0A0A] p-4">
                  <p className="text-xs text-[#A0A0A0]">
                    Availability
                  </p>
                  <p className="mt-2 font-semibold text-[#B6FF00]">
                    {selectedProduct.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Ingredients
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProduct.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-[#303030] px-3 py-2 text-xs text-[#D8D8D8]"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-[#303030] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-[#A0A0A0]">
                    Price per serving
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {formatPrice(selectedProduct.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 rounded-[10px] border border-[#303030] px-3 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQuantity((quantity) =>
                          Math.max(1, quantity - 1)
                        )
                      }
                      aria-label="Decrease quantity"
                      className="text-white hover:text-[#B6FF00]"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="min-w-4 text-center text-sm font-semibold text-white">
                      {selectedQuantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQuantity((quantity) => quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="text-white hover:text-[#B6FF00]"
                    >
                      <Plus size={17} />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={!selectedProduct.available}
                    onClick={() =>
                      addToCart(selectedProduct, selectedQuantity)
                    }
                    className="min-h-11 rounded-[10px] bg-[#B6FF00] px-5 text-xs font-bold text-black hover:bg-[#A5E600] disabled:opacity-40"
                  >
                    Add · {formatPrice(selectedProduct.price * selectedQuantity)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <div
          className="fixed inset-0 z-[110] flex justify-end bg-black/75"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="flex h-full w-full max-w-[480px] flex-col border-l border-[#303030] bg-[#0A0A0A]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#303030] p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Your Cart
                </h2>
                <p className="mt-1 text-xs text-[#A0A0A0]">
                  {cartCount} item(s)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
                className="text-white hover:text-[#B6FF00]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingCart size={40} className="text-[#A0A0A0]" />
                  <h3 className="font-semibold text-white">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-[#A0A0A0]">
                    Explore our menu and add your favourite drinks.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="text-sm font-semibold text-[#B6FF00]"
                  >
                    Explore menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-[#303030] pb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white">
                          {item.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#A0A0A0] hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="mt-1 text-xs text-[#A0A0A0]">
                        {item.size}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="text-[#A0A0A0] hover:text-[#B6FF00]"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="text-sm text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="text-[#A0A0A0] hover:text-[#B6FF00]"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-4 border-t border-[#303030] p-6">
                <div className="flex justify-between">
                  <span className="text-sm text-[#A0A0A0]">
                    Subtotal
                  </span>
                  <span className="font-semibold text-white">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#B6FF00]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowCart(false);
                    alert('Checkout screen will be connected in the next step.');
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] text-sm font-bold text-black hover:bg-[#A5E600]"
                >
                  Proceed to Checkout
                  <ArrowUpRight size={17} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export default CafePage;
