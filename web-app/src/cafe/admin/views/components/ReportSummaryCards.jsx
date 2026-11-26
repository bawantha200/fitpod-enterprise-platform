/**
 * ReportSummaryCards.jsx  (View component)
 * The eight headline numbers of a report.
 */
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

export default function ReportSummaryCards({ summary }) {
  const cards = [
    { label: 'Sales', value: formatCurrency(summary.sales), hint: 'Completed orders only', highlight: true },
    { label: 'Orders placed', value: summary.ordersPlaced },
    { label: 'Completed orders', value: summary.completedOrders },
    { label: 'Average order value', value: formatCurrency(summary.averageOrderValue) },
    { label: 'Pending sales', value: formatCurrency(summary.pendingSales), hint: 'Orders still in progress' },
    { label: 'In progress', value: summary.inProgressOrders },
    { label: 'Rejected or cancelled', value: summary.rejectedOrders + summary.cancelledOrders },
    { label: 'Items sold', value: summary.itemsSold },
  ];

  return (
    <dl aria-label="Report summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className={`${cafeTheme.card} p-4`}>
          <dt className="text-xs text-[#a0a0a0]">{card.label}</dt>
          <dd className={`mt-1 text-2xl font-bold ${card.highlight ? 'text-[#b6ff00]' : ''}`}>{card.value}</dd>
          {card.hint && <p className="mt-0.5 text-xs text-[#a0a0a0]">{card.hint}</p>}
        </div>
      ))}
    </dl>
  );
}
