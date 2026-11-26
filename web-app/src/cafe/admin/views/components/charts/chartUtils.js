/**
 * chartUtils.js
 * Small maths helpers for drawing the charts.
 */

/**
 * Picks a tidy top value and tick marks for a chart axis.
 * Example: a highest value of 12,340 gives ticks 0, 4000, 8000, 12000, 16000.
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

/** Point on a circle. Angle 0 is "3 o'clock"; we start the donut at the top (-PI/2). */
export function polarPoint(centerX, centerY, radius, angle) {
  return [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)];
}

/** SVG path for an arc of a circle (used to draw donut slices). */
export function arcPath(centerX, centerY, radius, startAngle, endAngle) {
  const [startX, startY] = polarPoint(centerX, centerY, radius, startAngle);
  const [endX, endY] = polarPoint(centerX, centerY, radius, endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
}
