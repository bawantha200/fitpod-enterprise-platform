/**
 * CafeSidebar.jsx
 * ------------------------------------------------------------------
 * Left navigation. The menu items depend on the logged-in role
 * (see cafeNavigation.js), so Admin and Cafe Staff see different
 * sidebars.
 * ------------------------------------------------------------------
 */
import { NavLink } from 'react-router-dom';
import {
  UtensilsCrossed,
  Tags,
  ClipboardList,
  TrendingUp,
  BellRing,
  ShoppingBag,
  History,
} from 'lucide-react';
import useCafeSession from '../../viewmodels/useCafeSession';
import RoleSwitcher from './RoleSwitcher';
import { CAFE_NAVIGATION } from '../../constants/cafeNavigation';
import { CAFE_ROLE_LABELS } from '../../constants/cafeRoles';
import { cafeTheme } from '../../constants/cafeTheme';

// Maps the icon names used in cafeNavigation.js to the real icons.
const ICONS = { UtensilsCrossed, Tags, ClipboardList, TrendingUp, BellRing, ShoppingBag, History };

export default function CafeSidebar({ onNavigate }) {
  const { role, isDevSession } = useCafeSession();
  const items = CAFE_NAVIGATION[role] ?? [];

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div>
        <p className="text-xl font-extrabold tracking-tight">.fit pod</p>
        <p className="mt-0.5 text-xs text-[#b6ff00]">Cafe: {CAFE_ROLE_LABELS[role]}</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Cafe navigation">
        {items.map(({ label, path, icon }) => {
          const Icon = ICONS[icon];
          return (
            <NavLink
              key={path}
              to={path}
              onClick={onNavigate}
              className={({ isActive }) => (isActive ? cafeTheme.navLinkActive : cafeTheme.navLink)}
            >
              {Icon && <Icon size={18} aria-hidden="true" />}
              {label}
            </NavLink>
          );
        })}
      </nav>

      {isDevSession && <RoleSwitcher />}
    </div>
  );
}
