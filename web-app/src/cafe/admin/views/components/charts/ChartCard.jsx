/**
 * ChartCard.jsx  (View component)
 * The box around every chart: a title, a short explanation, and either
 * the chart or a "no data" message.
 */
import { cafeTheme } from '../../../../common/constants/cafeTheme';

export default function ChartCard({ title, description, isEmpty = false, emptyMessage = 'No data for this period.', className = '', children }) {
  return (
    <section aria-label={title} className={`${cafeTheme.card} p-5 ${className}`}>
      <h2 className="text-base font-semibold">{title}</h2>
      {description && <p className={`${cafeTheme.muted} mt-0.5`}>{description}</p>}
      <div className="mt-4">{isEmpty ? <p className={cafeTheme.muted}>{emptyMessage}</p> : children}</div>
    </section>
  );
}
