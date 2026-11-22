/**
 * CafeLayout.jsx
 * ------------------------------------------------------------------
 * The frame around every cafe page: sidebar on the left (a slide-in
 * drawer on small screens) and the current page on the right.
 * ------------------------------------------------------------------
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CafeSidebar from './CafeSidebar';
import { cafeTheme } from '../../constants/cafeTheme';

export default function CafeLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={`${cafeTheme.page} md:flex`}>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[#303030] md:block">
        <div className="sticky top-0 h-screen">
          <CafeSidebar />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-[#303030] p-4 md:hidden">
        <p className="text-lg font-extrabold">.fit pod</p>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="rounded-lg border border-[#303030] p-2"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-[#303030] bg-[#0a0a0a]">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-lg p-1 text-[#a0a0a0]"
            >
              <X size={20} />
            </button>
            <CafeSidebar onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Current page */}
      <main className="min-w-0 flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
