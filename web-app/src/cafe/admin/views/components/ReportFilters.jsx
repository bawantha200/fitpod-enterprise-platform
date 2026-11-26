/**
 * ReportFilters.jsx  (View component)
 * The controls above the report:
 *   - report type: Daily / Weekly / Monthly / Custom range
 *   - the date pickers for that type, with Previous / Next buttons
 *   - category filter and order type filter
 * It only shows and changes the choices; the view model does the work.
 */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FilterChip from '../../../common/views/components/FilterChip';
import { cafeTheme } from '../../../common/constants/cafeTheme';
import { ORDER_SOURCE_FILTERS } from '../../../common/constants/cafeOrderFilters';
import { PERIOD_TYPES } from '../../../common/models/cafeReport';
import { MONTH_NAMES } from '../../../common/utils/dateUtils';
import { ALL_CATEGORIES } from '../../viewmodels/useReportsViewModel';

const TYPE_OPTIONS = [
  { key: PERIOD_TYPES.DAILY, label: 'Daily' },
  { key: PERIOD_TYPES.WEEKLY, label: 'Weekly' },
  { key: PERIOD_TYPES.MONTHLY, label: 'Monthly' },
  { key: PERIOD_TYPES.CUSTOM, label: 'Custom range' },
];
const STEP_NAME = { [PERIOD_TYPES.DAILY]: 'day', [PERIOD_TYPES.WEEKLY]: 'week', [PERIOD_TYPES.MONTHLY]: 'month' };

export default function ReportFilters({ vm }) {
  const fieldLabel = 'block text-xs font-medium text-[#a0a0a0]';
  const years = [vm.thisYear - 2, vm.thisYear - 1, vm.thisYear];
  const stepName = STEP_NAME[vm.periodType];

  return (
    <section aria-label="Report settings" className={`${cafeTheme.card} space-y-5 p-5`}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Report type">
        {TYPE_OPTIONS.map((option) => (
          <FilterChip key={option.key} label={option.label} isActive={vm.periodType === option.key} onClick={() => vm.setPeriodType(option.key)} />
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        {/* Daily and weekly: one date */}
        {(vm.periodType === PERIOD_TYPES.DAILY || vm.periodType === PERIOD_TYPES.WEEKLY) && (
          <div>
            <label htmlFor="report-date" className={fieldLabel}>
              {vm.periodType === PERIOD_TYPES.DAILY ? 'Date' : 'Any date in the week'}
            </label>
            <input id="report-date" type="date" value={vm.dateValue} onChange={(event) => vm.setDateValue(event.target.value)} className={`${cafeTheme.input} mt-1`} />
          </div>
        )}

        {/* Monthly: month and year */}
        {vm.periodType === PERIOD_TYPES.MONTHLY && (
          <>
            <div>
              <label htmlFor="report-month" className={fieldLabel}>Month</label>
              <select id="report-month" value={vm.monthValue} onChange={(event) => vm.setMonthValue(Number(event.target.value))} className={`${cafeTheme.input} mt-1`}>
                {MONTH_NAMES.map((name, index) => (
                  <option key={name} value={index}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="report-year" className={fieldLabel}>Year</label>
              <select id="report-year" value={vm.yearValue} onChange={(event) => vm.setYearValue(Number(event.target.value))} className={`${cafeTheme.input} mt-1`}>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Custom: from and to */}
        {vm.periodType === PERIOD_TYPES.CUSTOM && (
          <>
            <div>
              <label htmlFor="report-from" className={fieldLabel}>From</label>
              <input id="report-from" type="date" value={vm.fromValue} onChange={(event) => vm.setFromValue(event.target.value)} className={`${cafeTheme.input} mt-1`} />
            </div>
            <div>
              <label htmlFor="report-to" className={fieldLabel}>To</label>
              <input id="report-to" type="date" value={vm.toValue} onChange={(event) => vm.setToValue(event.target.value)} className={`${cafeTheme.input} mt-1`} />
            </div>
          </>
        )}

        {/* Previous / Next */}
        {stepName && (
          <div className="flex gap-2">
            <button type="button" className={cafeTheme.buttonGhost} disabled={!vm.canStep} onClick={() => vm.stepPeriod(-1)} aria-label={`Previous ${stepName}`}>
              <ChevronLeft size={16} aria-hidden="true" />
              Previous
            </button>
            <button type="button" className={cafeTheme.buttonGhost} disabled={!vm.canGoNext} onClick={() => vm.stepPeriod(1)} aria-label={`Next ${stepName}`}>
              Next
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label htmlFor="report-category" className={fieldLabel}>Category</label>
          <select id="report-category" value={vm.categoryId} onChange={(event) => vm.setCategoryId(event.target.value)} className={`${cafeTheme.input} mt-1 min-w-48`}>
            <option value={ALL_CATEGORIES}>All categories</option>
            {vm.categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="report-source" className={fieldLabel}>Order type</label>
          <select id="report-source" value={vm.sourceKey} onChange={(event) => vm.setSourceKey(event.target.value)} className={`${cafeTheme.input} mt-1 min-w-48`}>
            {ORDER_SOURCE_FILTERS.map((filter) => (
              <option key={filter.key} value={filter.key}>{filter.label}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
