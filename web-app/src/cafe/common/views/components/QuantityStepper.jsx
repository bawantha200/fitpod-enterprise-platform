/**
 * QuantityStepper.jsx  (View component, shared)
 * A "- 2 +" control for changing a quantity. `label` is the item name,
 * used only for screen readers ("Decrease quantity of Green Energy").
 */
import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, min = 1, max, label, onDecrease, onIncrease }) {
  const buttonClass =
    'p-2 text-white transition hover:text-[#b6ff00] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#b6ff00]';

  return (
    <div role="group" aria-label={`Quantity of ${label}`} className="inline-flex items-center rounded-lg border border-[#303030]">
      <button type="button" className={buttonClass} aria-label={`Decrease quantity of ${label}`} disabled={value <= min} onClick={onDecrease}>
        <Minus size={14} aria-hidden="true" />
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={buttonClass} aria-label={`Increase quantity of ${label}`} disabled={value >= max} onClick={onIncrease}>
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
