/**
 * chartMath.js
 * Maths helpers for chart axes, shared by the on-screen charts and by
 * the PDF export.
 */

/**
 * Picks a tidy top value and tick marks for a chart axis.
 * Example: a highest value of 12,340 gives ticks 0, 5000, 10000, 15000.
 */
export function niceScale(maxValue, tickTarget = 4) {
  if (!(maxValue > 0)) return { max: 1, ticks: [0, 1] };
  const rough = maxValue / tickTarget;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= rough);
  const max = step * Math.ceil(maxValue / step - 1e-9);
  const ticks = [];
  for (let value = 0; value <= max + 1e-9; value += step) ticks.push(Math.round(value * 100) / 100);
  return { max, ticks };
}

/** 950 -> "950", 12500 -> "12.5k" (short numbers for axis labels). */
export function formatCompact(value) {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
}
