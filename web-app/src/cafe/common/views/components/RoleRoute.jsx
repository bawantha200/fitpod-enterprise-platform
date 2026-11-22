/**
 * RoleRoute.jsx
 * ------------------------------------------------------------------
 * Guards a group of routes: only the allowed role may open them.
 * Anyone else is sent to the home page of their own role.
 * ------------------------------------------------------------------
 */
import { Navigate, Outlet } from 'react-router-dom';
import useCafeSession from '../../viewmodels/useCafeSession';
import { CAFE_HOME_PATH } from '../../constants/cafeRoles';

export default function RoleRoute({ allowedRole }) {
  const { role } = useCafeSession();

  if (role !== allowedRole) {
    return <Navigate to={CAFE_HOME_PATH[role]} replace />;
  }
  return <Outlet />;
}
