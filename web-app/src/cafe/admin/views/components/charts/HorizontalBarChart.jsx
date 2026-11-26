/**
 * HorizontalBarChart.jsx  (View component)
 * A ranked list with a bar behind each row (top selling items).
 *   rows - [{ label, value, valueText }]; the longest bar is the biggest value.
 */
export default function HorizontalBarChart({ rows, barColor = '#b6ff00' }) {
  const max = Math.max(1, ...rows.map((row) => row.value));

  return (
    <ol className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium">{row.label}</span>
            <span className="shrink-0 text-[#a0a0a0]">{row.valueText}</span>
          </div>
          <div className="mt-1 h-2.5 rounded-full bg-[#303030]" aria-hidden="true">
            <div className="h-full rounded-full" style={{ width: `${(row.value / max) * 100}%`, backgroundColor: barColor }} />
          </div>
        </li>
      ))}
    </ol>
  );
}
