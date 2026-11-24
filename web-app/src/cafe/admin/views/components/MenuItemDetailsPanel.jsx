/**
 * MenuItemDetailsPanel.jsx  (View component)
 * Slide-in panel on the right showing everything about one menu item,
 * with buttons to edit or remove it.
 */
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

export default function MenuItemDetailsPanel({ item, categoryName, onEdit, onRemove, onClose }) {
  const closeButtonRef = useRef(null);

  // Move keyboard focus into the panel when it opens.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const rows = [
    ['Category', categoryName],
    ['Price', formatCurrency(item.price)],
    ['Size', `${item.sizeMl} ml`],
    ['Status', item.isAvailable ? 'Available' : 'Unavailable'],
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-details-title"
        className="relative h-full w-full max-w-md overflow-y-auto border-l border-[#303030] bg-[#0a0a0a] p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="item-details-title" className="text-xl font-bold">
            {item.name}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close item details"
            className="rounded-lg border border-[#303030] p-2 hover:border-[#b6ff00]"
          >
            <X size={18} />
          </button>
        </div>

        <dl className={`${cafeTheme.card} mt-6 divide-y divide-[#303030]`}>
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 p-3 text-sm">
              <dt className="text-[#a0a0a0]">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-6 text-sm font-semibold">Description</h3>
        <p className={`${cafeTheme.muted} mt-1`}>{item.description || 'No description.'}</p>

        <div className="mt-8 flex gap-2">
          <button type="button" className={cafeTheme.buttonPrimary} onClick={() => onEdit(item)}>
            Edit item
          </button>
          <button type="button" className={cafeTheme.buttonDanger} onClick={() => onRemove(item)}>
            Remove item
          </button>
        </div>
      </aside>
    </div>
  );
}
