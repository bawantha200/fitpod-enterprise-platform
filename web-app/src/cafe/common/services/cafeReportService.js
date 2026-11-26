/**
 * cafeReportService.js  (Service layer)
 * ------------------------------------------------------------------
 * The ONLY place the Reports page gets its report from.
 *
 * RIGHT NOW it builds the report in the browser from the fake orders
 * (the live orders + some fake history, see mockReportOrders.js).
 *
 * LATER the real backend will add up the orders in the database, and
 * getReport() will become one call such as
 *   apiClient.get('/cafe/reports', { params: { ...period, ...filters } })
 * returning the same report object. The screens will not change.
 * ------------------------------------------------------------------
 */
import { buildReport } from '../models/cafeReport';
import { createMockHistoricalOrders } from '../models/mockReportOrders';
import cafeMenuService from './cafeMenuService';
import cafeOrderService from './cafeOrderService';

let historicalOrders = createMockHistoricalOrders();

const cafeReportService = {
  /**
   * period  - from resolvePeriod() (start and end as ISO strings)
   * filters - { categoryId: string | null, source: 'mobile' | 'walk_in' | null }
   */
  async getReport({ period, filters }) {
    const [liveOrders, categories] = await Promise.all([
      cafeOrderService.getAllOrders(),
      cafeMenuService.getCategories(),
    ]);
    return buildReport([...liveOrders, ...historicalOrders], period, filters, categories);
  },

  /** For automated tests only: puts the fake history back to its start. */
  resetMockData() {
    historicalOrders = createMockHistoricalOrders();
  },
};

export default cafeReportService;
