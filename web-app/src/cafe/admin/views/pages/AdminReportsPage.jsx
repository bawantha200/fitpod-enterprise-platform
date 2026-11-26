/**
 * AdminReportsPage.jsx  (View)
 * ------------------------------------------------------------------
 * Administrator: cafe reports with charts.
 * Covers the use cases: View Daily Order Report and View Cafe Sales
 * Summary - and goes further: weekly, monthly and custom periods,
 * category and order-type filters, charts, and CSV download.
 * All logic is in useReportsViewModel - this file only draws.
 * ------------------------------------------------------------------
 */
import { Download, RefreshCw } from 'lucide-react';
import useReportsViewModel from '../../viewmodels/useReportsViewModel';
import ReportFilters from '../components/ReportFilters';
import ReportSummaryCards from '../components/ReportSummaryCards';
import ChartCard from '../components/charts/ChartCard';
import ColumnChart from '../components/charts/ColumnChart';
import DonutChart from '../components/charts/DonutChart';
import HorizontalBarChart from '../components/charts/HorizontalBarChart';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { formatCurrency } from '../../../common/utils/formatters';

// Colours for the charts (all readable on the dark background).
const STATUS_COLORS = { completed: '#b6ff00', in_progress: '#ffde59', rejected: '#ff6b6b', cancelled: '#a0a0a0' };
const SOURCE_COLORS = ['#7dd3fc', '#c4b5fd'];
const CATEGORY_COLORS = ['#b6ff00', '#ffde59', '#7dd3fc', '#ff9f43', '#c4b5fd', '#ff6b6b'];

const TREND_TITLE = { hour: 'Sales by hour', day: 'Sales by day', week: 'Sales by week', month: 'Sales by month' };

export default function AdminReportsPage() {
  const vm = useReportsViewModel();
  const report = vm.report;

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cafeTheme.title}>Reports</h1>
          <p className={`${cafeTheme.muted} mt-1`}>Sales and orders for any day, week, month or custom period.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={cafeTheme.buttonGhost} onClick={vm.reload} disabled={vm.isLoading}>
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </button>
          <button type="button" className={cafeTheme.buttonPrimary} onClick={vm.downloadCsv} disabled={!report}>
            <Download size={16} aria-hidden="true" />
            Download CSV
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ReportFilters vm={vm} />
      </div>

      {/* Which period is being shown */}
      <div className="mt-6" aria-live="polite">
        {vm.period.error ? (
          <p role="alert" className="rounded-lg border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 p-3 text-sm text-[#ff6b6b]">
            {vm.period.error}
          </p>
        ) : (
          <div>
            <h2 className="text-lg font-bold">{vm.period.label}</h2>
            {report && (
              <p className={cafeTheme.muted}>
                {report.filters.categoryName}, {report.filters.sourceLabel}
              </p>
            )}
          </div>
        )}
      </div>

      {vm.isLoading && <p className={`${cafeTheme.muted} mt-4`}>Loading the report...</p>}
      {vm.loadError && (
        <div className={`${cafeTheme.card} mt-4 max-w-md p-6`}>
          <p role="alert" className="text-sm text-[#ff6b6b]">{vm.loadError}</p>
          <button type="button" className={`${cafeTheme.buttonPrimary} mt-4`} onClick={vm.reload}>
            Try again
          </button>
        </div>
      )}

      {report && (
        <div className="mt-4 space-y-4">
          <ReportSummaryCards summary={report.summary} />
          <p className={`${cafeTheme.muted} text-xs`}>
            Sales count completed orders only. Rejected and cancelled orders never earn money, and orders still in progress are
            shown as pending sales. An order belongs to the period in which it was placed.
          </p>

          {report.summary.ordersPlaced === 0 ? (
            <p className={cafeTheme.muted}>No orders match this period and these filters.</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title={TREND_TITLE[report.period.granularity]} description="Sales from completed orders." className="lg:col-span-2" isEmpty={report.summary.sales === 0} emptyMessage="No completed orders in this period yet.">
                <ColumnChart
                  data={report.trend.map((bucket) => ({ label: bucket.label, fullLabel: bucket.fullLabel, value: bucket.sales }))}
                  valueFormatter={formatCurrency}
                  ariaLabel={`${TREND_TITLE[report.period.granularity]} for ${report.period.label}`}
                />
              </ChartCard>

              <ChartCard title="Orders by status" description="All orders placed in this period.">
                <DonutChart
                  slices={report.statusBreakdown.map((entry) => ({ label: entry.label, value: entry.count, color: STATUS_COLORS[entry.key] }))}
                  centerValue={report.summary.ordersPlaced}
                  centerLabel="orders"
                  ariaLabel="Share of orders by status"
                />
              </ChartCard>

              <ChartCard title="Sales by category" description="Completed orders, by menu category." isEmpty={report.categoryBreakdown.length === 0} emptyMessage="No completed orders in this period yet.">
                <DonutChart
                  slices={report.categoryBreakdown.map((entry, index) => ({ label: entry.name, value: entry.sales, color: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }))}
                  valueFormatter={formatCurrency}
                  centerValue={formatCurrency(report.summary.sales)}
                  centerLabel="sales"
                  ariaLabel="Share of sales by category"
                />
              </ChartCard>

              <ChartCard title="Top selling items" description="By number sold, completed orders." isEmpty={report.topItems.length === 0} emptyMessage="No completed orders in this period yet.">
                <HorizontalBarChart rows={report.topItems.map((entry) => ({ label: entry.name, value: entry.quantity, valueText: `${entry.quantity} sold, ${formatCurrency(entry.sales)}` }))} />
              </ChartCard>

              <ChartCard title="Mobile and walk-in orders" description="All orders placed in this period.">
                <DonutChart
                  slices={report.sourceBreakdown.map((entry, index) => ({ label: entry.label, value: entry.orders, color: SOURCE_COLORS[index] }))}
                  centerValue={report.summary.ordersPlaced}
                  centerLabel="orders"
                  ariaLabel="Share of orders by order type"
                />
              </ChartCard>

              {report.period.granularity !== 'hour' && (
                <ChartCard title="Busiest hours" description="Orders placed in each hour of the day, added up over the whole period." className="lg:col-span-2">
                  <ColumnChart
                    data={report.hourBreakdown.map((entry) => ({ label: entry.label, value: entry.orders }))}
                    valueFormatter={(value) => `${value} orders`}
                    ariaLabel={`Orders by hour of the day for ${report.period.label}`}
                    barColor="#7dd3fc"
                  />
                </ChartCard>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
