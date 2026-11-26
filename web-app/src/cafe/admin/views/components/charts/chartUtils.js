/**
 * chartUtils.js
 * Helpers for drawing the on-screen SVG charts. The axis maths lives in
 * common/utils/chartMath.js (the PDF export uses it too) and is
 * re-exported here so the charts have one place to import from.
 */
export { formatCompact, niceScale } from '../../../../common/utils/chartMath';

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
