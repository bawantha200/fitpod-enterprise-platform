/**
 * ColumnChart.jsx  (View component)
 * Vertical bars, for values over time (sales per hour / day / week /
 * month, or orders per hour of the day).
 *   data           - [{ label, fullLabel, value }]
 *   valueFormatter - how a value is written (for example "Rs. 1,250")
 *   ariaLabel      - what the chart shows, for screen readers
 * Hover a bar to see its exact value. A hidden table repeats the data
 * for screen readers.
 */
import { formatCompact, niceScale } from './chartUtils';

const WIDTH = 640;
const HEIGHT = 260;
const MARGIN = { top: 12, right: 12, bottom: 30, left: 52 };

export default function ColumnChart({ data, valueFormatter = String, ariaLabel, barColor = '#b6ff00', axisFormatter = formatCompact }) {
  const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const { max, ticks } = niceScale(Math.max(0, ...data.map((entry) => entry.value)));
  const slot = plotWidth / data.length;
  const barWidth = Math.min(36, slot * 0.7);
  const labelEvery = Math.ceil(data.length / 12); // keep the x labels readable
  const yFor = (value) => MARGIN.top + plotHeight - (value / max) * plotHeight;

  return (
    <figure>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={yFor(tick)} y2={yFor(tick)} stroke="#303030" strokeWidth="1" />
            <text x={MARGIN.left - 8} y={yFor(tick) + 4} textAnchor="end" fontSize="11" fill="#a0a0a0">
              {axisFormatter(tick)}
            </text>
          </g>
        ))}
        {data.map((entry, index) => {
          const x = MARGIN.left + index * slot + (slot - barWidth) / 2;
          const barHeight = (entry.value / max) * plotHeight;
          return (
            <g key={`${entry.label}-${index}`}>
              <rect x={x} y={yFor(entry.value)} width={barWidth} height={barHeight} rx="3" fill={barColor}>
                <title>{`${entry.fullLabel ?? entry.label}: ${valueFormatter(entry.value)}`}</title>
              </rect>
              {index % labelEvery === 0 && (
                <text x={x + barWidth / 2} y={HEIGHT - 10} textAnchor="middle" fontSize="11" fill="#a0a0a0">
                  {entry.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <tbody>
          {data.map((entry, index) => (
            <tr key={`${entry.label}-${index}`}>
              <th scope="row">{entry.fullLabel ?? entry.label}</th>
              <td>{valueFormatter(entry.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
