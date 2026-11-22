/**
 * RoleSwitcher.jsx
 * ------------------------------------------------------------------
 * TEMPORARY development tool: lets us pretend to be Admin or Cafe
 * Staff until the real login is connected. It is only rendered when
 * no real user is logged in (see CafeSessionProvider).
 * ------------------------------------------------------------------
 */
import { useNavigate } from 'react-router-dom';
import useCafeSession from '../../viewmodels/useCafeSession';
import { CAFE_ROLES, CAFE_ROLE_LABELS, CAFE_HOME_PATH } from '../../constants/cafeRoles';

export default function RoleSwitcher() {
  const { role, switchDevRole } = useCafeSession();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const newRole = event.target.value;
    switchDevRole(newRole);
    navigate(CAFE_HOME_PATH[newRole]); // jump to that role's first page
  };

  return (
    <label className="block text-xs text-[#a0a0a0]">
      Dev mode: view as
      <select
        value={role}
        onChange={handleChange}
        className="mt-1 w-full rounded-lg border border-[#303030] bg-[#0a0a0a] px-2 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#b6ff00]"
      >
        {Object.values(CAFE_ROLES).map((r) => (
          <option key={r} value={r}>
            {CAFE_ROLE_LABELS[r]}
          </option>
        ))}
      </select>
    </label>
  );
}
