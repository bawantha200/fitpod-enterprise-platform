/**
 * FilterChip.jsx  (View component, shared)
 * A pill-shaped toggle button used for filters (status, category...).
 */
export default function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00] ${
        isActive
          ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
          : 'border-[#303030] text-[#a0a0a0] hover:border-[#b6ff00] hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
