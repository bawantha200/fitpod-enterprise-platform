/**
 * DonutChart.jsx  (View component)
 * A ring chart for shares of a whole (order statuses, sales per
 * category, mobile vs walk-in). The legend next to it lists every
 * slice with its value and percentage, so the colours are never the
 * only way to read it.
 *   slices - [{ label, value, color }]
 */
import { arcPath } from './chartUtils';

const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = 66;
const STROKE = 26;

export default function DonutChart({ slices, valueFormatter = String, centerValue, centerLabel, ariaLabel }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const visibleSlices = slices.filter((slice) => slice.value > 0);

  // Each slice starts where the previous one ended; the first starts at the top.
  const arcs = visibleSlices.map((slice, index) => {
    const valueBefore = visibleSlices.slice(0, index).reduce((sum, earlier) => sum + earlier.value, 0);
    const startAngle = -Math.PI / 2 + (valueBefore / total) * Math.PI * 2;
    const endAngle = startAngle + (slice.value / total) * Math.PI * 2;
    return { ...slice, startAngle, endAngle, isFull: slice.value === total };
  });

  return (
    <figure className="flex flex-col items-center gap-5 sm:flex-row">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={ariaLabel} className="h-44 w-44 shrink-0">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#303030" strokeWidth={STROKE} />
        {arcs.map((arc) =>
          arc.isFull ? (
            <circle key={arc.label} cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={arc.color} strokeWidth={STROKE}>
              <title>{`${arc.label}: ${valueFormatter(arc.value)}`}</title>
            </circle>
          ) : (
            <path key={arc.label} d={arcPath(CENTER, CENTER, RADIUS, arc.startAngle, arc.endAngle)} fill="none" stroke={arc.color} strokeWidth={STROKE}>
              <title>{`${arc.label}: ${valueFormatter(arc.value)}`}</title>
            </path>
          )
        )}
        {centerValue !== undefined && (
          <>
            <text x={CENTER} y={CENTER + 2} textAnchor="middle" fontSize="20" fontWeight="700" fill="#ffffff">
              {centerValue}
            </text>
            <text x={CENTER} y={CENTER + 20} textAnchor="middle" fontSize="10" fill="#a0a0a0">
              {centerLabel}
            </text>
          </>
        )}
      </svg>

      <ul className="w-full min-w-0 flex-1 space-y-2 text-sm">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: slice.color }} />
              <span className="truncate">{slice.label}</span>
            </span>
            <span className="shrink-0 text-[#a0a0a0]">
              {valueFormatter(slice.value)} ({total > 0 ? Math.round((slice.value / total) * 100) : 0}%)
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
