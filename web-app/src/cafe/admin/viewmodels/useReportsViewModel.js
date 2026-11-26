/**
 * useReportsViewModel.js  (ViewModel layer)
 * ------------------------------------------------------------------
 * All the LOGIC of the Admin "Reports" page:
 *   - the report type (daily / weekly / monthly / custom) and its dates
 *   - the category and order-type filters
 *   - loading the report whenever any of those change
 *   - Previous / Next period buttons
 *   - downloading the report as CSV
 * The page file only draws what this hook returns.
 * ------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import cafeMenuService from '../../common/services/cafeMenuService';
import cafeReportService from '../../common/services/cafeReportService';
import { PERIOD_TYPES, resolvePeriod } from '../../common/models/cafeReport';
import { ORDER_SOURCE_FILTERS } from '../../common/constants/cafeOrderFilters';
import { addDays, parseDateInput, toDateInputValue } from '../../common/utils/dateUtils';
import { exportReportCsv } from '../../common/utils/reportCsv';

export const ALL_CATEGORIES = 'all';

export default function useReportsViewModel() {
  // "Today" is fixed when the page opens.
  const [today] = useState(() => new Date());

  // What the admin picked
  const [periodType, setPeriodType] = useState(PERIOD_TYPES.DAILY);
  const [dateValue, setDateValue] = useState(() => toDateInputValue(new Date()));
  const [monthValue, setMonthValue] = useState(() => new Date().getMonth());
  const [yearValue, setYearValue] = useState(() => new Date().getFullYear());
  const [fromValue, setFromValue] = useState(() => toDateInputValue(addDays(new Date(), -6)));
  const [toValue, setToValue] = useState(() => toDateInputValue(new Date()));
  const [categoryId, setCategoryId] = useState(ALL_CATEGORIES);
  const [sourceKey, setSourceKey] = useState('all');

  // Data
  const [categories, setCategories] = useState([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [loaded, setLoaded] = useState({ key: null, report: null, error: '' });

  // The category list for the filter drop-down.
  useEffect(() => {
    let cancelled = false;
    cafeMenuService
      .getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        /* the filter simply stays at "All categories" */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The exact period (or an error message such as "end before start").
  const period = useMemo(
    () => resolvePeriod({ type: periodType, dateValue, monthValue, yearValue, fromValue, toValue }),
    [periodType, dateValue, monthValue, yearValue, fromValue, toValue]
  );

  // What we ask the service for. `null` while the period is not valid.
  const request = useMemo(() => {
    if (period.error) return null;
    const sourceFilter = ORDER_SOURCE_FILTERS.find((f) => f.key === sourceKey) ?? ORDER_SOURCE_FILTERS[0];
    return {
      period,
      filters: { categoryId: categoryId === ALL_CATEGORIES ? null : categoryId, source: sourceFilter.source },
    };
  }, [period, categoryId, sourceKey]);
  const requestKey = request ? `${JSON.stringify(request)}#${reloadCount}` : null;

  // Load the report whenever the request changes.
  useEffect(() => {
    if (!request) return undefined;
    let cancelled = false; // ignore an old answer if the admin already changed the filters
    cafeReportService
      .getReport(request)
      .then((report) => {
        if (!cancelled) setLoaded({ key: requestKey, report, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setLoaded({ key: requestKey, report: null, error: error.message || 'Could not load the report.' });
      });
    return () => {
      cancelled = true;
    };
  }, [request, requestKey]);

  const isCurrent = requestKey !== null && loaded.key === requestKey;
  const isLoading = requestKey !== null && !isCurrent;

  // ---- Previous / Next period ----------------------------------
  const stepPeriod = (direction) => {
    if (periodType === PERIOD_TYPES.DAILY || periodType === PERIOD_TYPES.WEEKLY) {
      const step = periodType === PERIOD_TYPES.DAILY ? 1 : 7;
      setDateValue((current) => toDateInputValue(addDays(parseDateInput(current) ?? new Date(), direction * step)));
    } else if (periodType === PERIOD_TYPES.MONTHLY) {
      const target = new Date(Number(yearValue), Number(monthValue) + direction, 1);
      setMonthValue(target.getMonth());
      setYearValue(target.getFullYear());
    }
  };
  const canStep = periodType !== PERIOD_TYPES.CUSTOM && !period.error;
  const canGoNext = canStep && new Date(period.end) <= today; // never step into the future

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  const downloadCsv = () => {
    if (isCurrent && loaded.report) exportReportCsv(loaded.report);
  };

  return {
    // what is picked
    periodType,
    dateValue,
    monthValue,
    yearValue,
    fromValue,
    toValue,
    categoryId,
    sourceKey,
    categories,
    thisYear: today.getFullYear(),
    todayValue: toDateInputValue(today),
    // result
    period,
    report: isCurrent ? loaded.report : null,
    loadError: isCurrent ? loaded.error : '',
    isLoading,
    canStep,
    canGoNext,
    // actions
    setPeriodType,
    setDateValue,
    setMonthValue,
    setYearValue,
    setFromValue,
    setToValue,
    setCategoryId,
    setSourceKey,
    stepPeriod,
    reload,
    downloadCsv,
  };
}
