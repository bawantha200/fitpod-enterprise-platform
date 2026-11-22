/**
 * CafeSessionProvider.jsx  (ViewModel layer)
 * ------------------------------------------------------------------
 * Tells the cafe portal WHO is logged in (admin or cafe_staff).
 *
 * 1. If the real login (authService, Module 01) has stored a user
 *    whose role is 'admin' or 'cafe_staff', we use that.
 * 2. Otherwise we fall back to a TEMPORARY development role that can
 *    be changed with the switcher at the bottom of the sidebar.
 *
 * When the login module is finished, step 1 starts working by itself
 * and the switcher disappears - no change is needed in our pages.
 * ------------------------------------------------------------------
 */
import { createContext, useCallback, useMemo, useState } from 'react';
import authService from '../../../shared/services/auth/authService';
import { CAFE_ROLES } from '../constants/cafeRoles';

export const CafeSessionContext = createContext(null);

const DEV_ROLE_KEY = 'fitpod_cafe_dev_role';
const VALID_ROLES = Object.values(CAFE_ROLES);

/** Read the real logged-in user's role, or null if there isn't one. */
function readRealRole() {
  try {
    const user = authService.getCurrentUser();
    return user && VALID_ROLES.includes(user.role) ? user.role : null;
  } catch {
    return null; // stored data was unreadable - treat as "not logged in"
  }
}

/** Read the temporary development role (defaults to admin). */
function readDevRole() {
  try {
    const saved = localStorage.getItem(DEV_ROLE_KEY);
    return VALID_ROLES.includes(saved) ? saved : CAFE_ROLES.ADMIN;
  } catch {
    return CAFE_ROLES.ADMIN;
  }
}

export default function CafeSessionProvider({ children }) {
  const realRole = readRealRole();
  const [devRole, setDevRole] = useState(readDevRole);

  /** Change the temporary role (only used while no real login exists). */
  const switchDevRole = useCallback((role) => {
    if (!VALID_ROLES.includes(role)) return;
    setDevRole(role);
    try {
      localStorage.setItem(DEV_ROLE_KEY, role);
    } catch {
      /* storage unavailable - the role still changes for this visit */
    }
  }, []);

  const value = useMemo(
    () => ({
      role: realRole ?? devRole,
      isDevSession: realRole === null, // true => show the role switcher
      switchDevRole,
    }),
    [realRole, devRole, switchDevRole]
  );

  return <CafeSessionContext.Provider value={value}>{children}</CafeSessionContext.Provider>;
}
