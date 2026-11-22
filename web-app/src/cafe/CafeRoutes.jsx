/**
 * CafeRoutes.jsx
 * ------------------------------------------------------------------
 * ENTRY POINT of the Cafe & Order Management module (web app).
 * App.jsx mounts this ONE component at  /cafe-portal/*  - everything
 * else about the module's routing lives here, inside our own folder.
 *
 *   /cafe-portal/admin/...   -> Administrator pages
 *   /cafe-portal/staff/...   -> Cafe Staff pages
 * ------------------------------------------------------------------
 */
import { Navigate, Route, Routes } from 'react-router-dom';

import CafeSessionProvider from './common/viewmodels/CafeSessionProvider';
import useCafeSession from './common/viewmodels/useCafeSession';
import CafeLayout from './common/views/components/CafeLayout';
import RoleRoute from './common/views/components/RoleRoute';
import { CAFE_ROLES, CAFE_HOME_PATH } from './common/constants/cafeRoles';

import AdminMenuPage from './admin/views/pages/AdminMenuPage';
import AdminCategoriesPage from './admin/views/pages/AdminCategoriesPage';
import AdminOrdersPage from './admin/views/pages/AdminOrdersPage';
import AdminReportsPage from './admin/views/pages/AdminReportsPage';

import StaffIncomingOrdersPage from './staff/views/pages/StaffIncomingOrdersPage';
import StaffWalkInOrderPage from './staff/views/pages/StaffWalkInOrderPage';
import StaffOrderHistoryPage from './staff/views/pages/StaffOrderHistoryPage';

/** Sends "/cafe-portal" itself to the right first page for the role. */
function RoleHomeRedirect() {
  const { role } = useCafeSession();
  return <Navigate to={CAFE_HOME_PATH[role]} replace />;
}

export default function CafeRoutes() {
  return (
    <CafeSessionProvider>
      <Routes>
        <Route element={<CafeLayout />}>
          <Route index element={<RoleHomeRedirect />} />

          {/* Administrator pages */}
          <Route path="admin" element={<RoleRoute allowedRole={CAFE_ROLES.ADMIN} />}>
            <Route path="menu" element={<AdminMenuPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>

          {/* Cafe Staff pages */}
          <Route path="staff" element={<RoleRoute allowedRole={CAFE_ROLES.STAFF} />}>
            <Route path="orders" element={<StaffIncomingOrdersPage />} />
            <Route path="walk-in" element={<StaffWalkInOrderPage />} />
            <Route path="history" element={<StaffOrderHistoryPage />} />
          </Route>

          {/* Anything unknown goes to the role's home page */}
          <Route path="*" element={<RoleHomeRedirect />} />
        </Route>
      </Routes>
    </CafeSessionProvider>
  );
}
