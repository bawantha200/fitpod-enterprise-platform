/**
 * AvailabilitySwitch.jsx  (View component)
 * An on/off switch for "available to order". Lime = available.
 */
export default function AvailabilitySwitch({ itemName, isAvailable, disabled, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isAvailable}
      aria-label={`Availability of ${itemName}`}
      disabled={disabled}
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff00]"
    >
      <span className={`relative inline-block h-6 w-11 rounded-full transition ${isAvailable ? 'bg-[#b6ff00]' : 'bg-[#303030]'}`}>
        <span
          className={`absolute top-1 h-4 w-4 rounded-full transition-all ${isAvailable ? 'left-6 bg-black' : 'left-1 bg-white'}`}
        />
      </span>
      <span className="w-20 text-left text-xs text-[#a0a0a0]">{isAvailable ? 'Available' : 'Unavailable'}</span>
    </button>
  );
}
